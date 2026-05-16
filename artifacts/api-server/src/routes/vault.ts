import { Router } from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, UpdateCommand, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { randomUUID } from "crypto";

const router = Router();

const dynamo = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: process.env["AWS_REGION"] ?? "us-east-1",
    credentials: {
      accessKeyId: process.env["AWS_ACCESS_KEY_ID"] ?? "",
      secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"] ?? "",
    },
  }),
);

const bedrock = new BedrockRuntimeClient({
  region: process.env["AWS_REGION"] ?? "us-east-1",
  credentials: {
    accessKeyId: process.env["AWS_ACCESS_KEY_ID"] ?? "",
    secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"] ?? "",
  },
});

const TABLE = "DUncle_Users";
const TX_TABLE = "DUncle_Transactions";

async function performTransfer(
  sender: string,
  receiver: string,
  amount: number,
  currency: string,
): Promise<{ ok: boolean; message: string }> {
  const [sRes, rRes] = await Promise.all([
    dynamo.send(new GetCommand({ TableName: TABLE, Key: { username: sender } })),
    dynamo.send(new GetCommand({ TableName: TABLE, Key: { username: receiver } })),
  ]);

  if (!sRes.Item || !rRes.Item) {
    return { ok: false, message: "One of the users is missing from the vault!" };
  }

  // GUARDRAIL: Check daily spend limit
  const dailyLimit = parseFloat(String(sRes.Item["daily_limit"] ?? 1000));
  if (amount > dailyLimit) {
    return {
      ok: false,
      message: `Guardrail Triggered! D'Uncle says: That's above your $${dailyLimit} daily limit! 🛑`,
    };
  }

  const senderBal = parseFloat(String(sRes.Item[currency] ?? 0));
  if (senderBal < amount) {
    return { ok: false, message: "D'Uncle says: Not enough funds, Nephew!" };
  }

  const newSenderBal = senderBal - amount;
  const newReceiverBal = parseFloat(String(rRes.Item[currency] ?? 0)) + amount;

  // Update both balances + write ledger record in parallel
  await Promise.all([
    dynamo.send(new UpdateCommand({
      TableName: TABLE,
      Key: { username: sender },
      UpdateExpression: "set #b = :v",
      ExpressionAttributeNames: { "#b": currency },
      ExpressionAttributeValues: { ":v": newSenderBal },
    })),
    dynamo.send(new UpdateCommand({
      TableName: TABLE,
      Key: { username: receiver },
      UpdateExpression: "set #b = :v",
      ExpressionAttributeNames: { "#b": currency },
      ExpressionAttributeValues: { ":v": newReceiverBal },
    })),
    dynamo.send(new PutCommand({
      TableName: TX_TABLE,
      Item: {
        transaction_id: randomUUID(),
        sender,
        receiver,
        amount,
        currency,
        timestamp: new Date().toISOString(),
        status: "Success",
      },
    })),
  ]);

  return { ok: true, message: `Sent ${amount} ${currency} to ${receiver} 🌈` };
}

// GET BALANCE
router.get("/get_balance", async (req, res) => {
  const username = (req.query["username"] as string) ?? "@DUncle_CEO";
  try {
    const result = await dynamo.send(new GetCommand({ TableName: TABLE, Key: { username } }));
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

// SEND MONEY
router.post("/send", async (req, res) => {
  const { sender, receiver, amount, currency = "balance_usd" } = req.body as {
    sender: string; receiver: string; amount: number; currency: string;
  };

  if (!sender || !receiver || !amount || amount <= 0) {
    res.status(400).json({ error: "Invalid transaction details!" });
    return;
  }

  try {
    const result = await performTransfer(sender, receiver, amount, currency);
    if (result.ok) {
      res.json({ message: result.message });
    } else {
      res.status(400).json({ error: result.message });
    }
  } catch (err) {
    req.log.error({ err }, "Send money error");
    res.status(500).json({ error: "Could not process the transaction." });
  }
});

// GET HISTORY
router.get("/get_history", async (req, res) => {
  const username = (req.query["username"] as string) ?? "@DUncle_CEO";
  try {
    const result = await dynamo.send(new ScanCommand({ TableName: TX_TABLE }));
    const all = (result.Items ?? []) as Array<Record<string, unknown>>;
    const userTxs = all
      .filter((t) => t["sender"] === username || t["receiver"] === username)
      .sort((a, b) => String(b["timestamp"]).localeCompare(String(a["timestamp"])));
    res.json(userTxs);
  } catch (err) {
    req.log.error({ err }, "Get history error");
    res.status(500).json({ error: "Could not fetch history." });
  }
});

// UPDATE DAILY LIMIT
router.post("/update_limit", async (req, res) => {
  const { username, limit } = req.body as { username: string; limit: number };
  if (!username || limit == null || isNaN(Number(limit)) || Number(limit) < 0) {
    res.status(400).json({ error: "Invalid limit value." });
    return;
  }
  try {
    await dynamo.send(new UpdateCommand({
      TableName: TABLE,
      Key: { username },
      UpdateExpression: "set daily_limit = :v",
      ExpressionAttributeValues: { ":v": parseFloat(String(limit)) },
    }));
    res.json({ message: "Guardrail updated! D'Uncle is watching your wallet. 🛡️" });
  } catch (err) {
    req.log.error({ err }, "Update limit error");
    res.status(500).json({ error: "Could not update the guardrail." });
  }
});

// ASK UNCLE — AI BRAIN
router.post("/ask_uncle", async (req, res) => {
  const { message, username = "@DUncle_CEO" } = req.body as {
    message: string; username: string;
  };

  if (!message) {
    res.status(400).json({ error: "No message provided." });
    return;
  }

  try {
    const userRes = await dynamo.send(new GetCommand({ TableName: TABLE, Key: { username } }));
    const balanceInfo = userRes.Item
      ? `USD: ${userRes.Item["balance_usd"] ?? 0}, PHP: ${userRes.Item["balance_php"] ?? 0}, USDT: ${userRes.Item["balance_usdt"] ?? 0}`
      : "Balance unavailable";

    const prompt = `You are D'Uncle: The Global Uncle. A friendly, colorful, and professional financial guide.
User: ${username}
Current Vault: ${balanceInfo}
User Message: "${message}"

Instruction: If the user wants to send money, respond ONLY with valid JSON:
{ "action": "send", "receiver": "@username", "amount": 10, "currency": "balance_usd", "reply": "Your friendly message here" }
If they are just chatting or asking questions, respond ONLY with valid JSON:
{ "action": "chat", "reply": "Your friendly message here" }
Do not include any text outside the JSON.`;

    const body = JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    });

    const bedrockRes = await bedrock.send(new InvokeModelCommand({
      modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body,
    }));

    const responseBody = JSON.parse(new TextDecoder().decode(bedrockRes.body));
    const aiText: string = responseBody.content[0].text.trim();

    let aiDecision: { action: string; receiver?: string; amount?: number; currency?: string; reply: string };
    try {
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      aiDecision = JSON.parse(jsonMatch ? jsonMatch[0] : aiText);
    } catch {
      res.json({ reply: aiText, status: "chat" });
      return;
    }

    if (aiDecision.action === "send" && aiDecision.receiver && aiDecision.amount && aiDecision.currency) {
      const transfer = await performTransfer(username, aiDecision.receiver, aiDecision.amount, aiDecision.currency);
      res.json({
        reply: aiDecision.reply,
        status: transfer.ok ? "paid" : "error",
        details: transfer.message,
      });
    } else {
      res.json({ reply: aiDecision.reply, status: "chat" });
    }
  } catch (err) {
    req.log.error({ err }, "Bedrock error");
    res.status(500).json({ error: "D'Uncle's brain is resting. Try again! 🧠" });
  }
});

export default router;
