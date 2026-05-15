import { Router } from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

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
      new GetCommand({
        TableName: "DUncle_Users",
        Key: { username },
      }),
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

export default router;
