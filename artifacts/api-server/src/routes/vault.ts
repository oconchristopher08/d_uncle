import { Router } from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const router = Router();

const client = new DynamoDBClient({
  region: process.env["AWS_REGION"] ?? "us-east-1",
  credentials: {
    accessKeyId: process.env["AWS_ACCESS_KEY_ID"] ?? "",
    secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"] ?? "",
  },
});

const dynamo = DynamoDBDocumentClient.from(client);

router.get("/get_balance", async (req, res) => {
  const username = (req.query["username"] as string) ?? "@DUncle_CEO";

  try {
    const result = await dynamo.send(
      new GetCommand({ TableName: "DUncle_Users", Key: { username } }),
    );

    if (result.Item) {
      res.json(result.Item);
    } else {
      res.status(404).json({ error: "D'Uncle cannot find this user!" });
    }
  } catch (err) {
    req.log.error({ err }, "DynamoDB error");
    res.status(500).json({ error: "Could not reach the vault." });
  }
});

router.post("/send", async (req, res) => {
  const { sender, receiver, amount, currency = "balance_usd" } = req.body as {
    sender: string;
    receiver: string;
    amount: number;
    currency: string;
  };

  if (!sender || !receiver || !amount || amount <= 0) {
    res.status(400).json({ error: "Invalid transaction details!" });
    return;
  }

  try {
    const [senderRes, receiverRes] = await Promise.all([
      dynamo.send(new GetCommand({ TableName: "DUncle_Users", Key: { username: sender } })),
      dynamo.send(new GetCommand({ TableName: "DUncle_Users", Key: { username: receiver } })),
    ]);

    if (!senderRes.Item || !receiverRes.Item) {
      res.status(404).json({ error: "One of the users is missing from the vault!" });
      return;
    }

    const currentBalance = parseFloat(String(senderRes.Item[currency] ?? 0));
    if (currentBalance < amount) {
      res.status(400).json({ error: "D'Uncle says: Not enough funds, Nephew!" });
      return;
    }

    const newSenderBal = currentBalance - amount;
    const newReceiverBal = parseFloat(String(receiverRes.Item[currency] ?? 0)) + amount;

    await Promise.all([
      dynamo.send(new UpdateCommand({
        TableName: "DUncle_Users",
        Key: { username: sender },
        UpdateExpression: "set #bal = :val",
        ExpressionAttributeNames: { "#bal": currency },
        ExpressionAttributeValues: { ":val": newSenderBal },
      })),
      dynamo.send(new UpdateCommand({
        TableName: "DUncle_Users",
        Key: { username: receiver },
        UpdateExpression: "set #bal = :val",
        ExpressionAttributeNames: { "#bal": currency },
        ExpressionAttributeValues: { ":val": newReceiverBal },
      })),
    ]);

    res.json({ message: `Success! ${amount} ${currency} sent to ${receiver} 🌈` });
  } catch (err) {
    req.log.error({ err }, "Send money error");
    res.status(500).json({ error: "Could not process the transaction." });
  }
});

export default router;
