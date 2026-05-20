# 🌍 D'Uncle: The Global AI Vault
> 🌈 *"The Sovereign Financial Layer for the Agentic Web"*

[![AWS Bedrock](https://img.shields.io/badge/AWS-Bedrock-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/bedrock/)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-Backend-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![DynamoDB](https://img.shields.io/badge/DynamoDB-Data_Layer-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white)](https://aws.amazon.com/dynamodb/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📌 Overview

**D'Uncle** is a specialized *financial orchestrator* built to solve the **"Last Mile Problem"** of the AI economy.

Modern AI agents — powered by LLMs — can reason, plan, and communicate. But they have **no native, secure mechanism to hold funds or execute payments**. D'Uncle fills this gap.

D'Uncle provides a **Sovereign Vault**: a programmable, multi-currency financial layer where AI agents can:
- 💰 Store and manage multi-currency balances (USD, PHP, USDT, USDC)
- 🛡️ Operate within human-defined spending guardrails
- 🌐 Execute seamless cross-border micropayments
- 🧾 Maintain a full, immutable transaction ledger

> 🎯 **Core Mission:** Make AI agents economically capable — without sacrificing human oversight or security.

---

## 🚀 Key Features

### 🛡️ 1. Agentic Guardrails (Sovereign Governance)
Unlike traditional wallets, D'Uncle implements **programmable spending policies**. Users define a `daily_limit`, ensuring autonomous AI agents cannot overspend or drain funds without human-approved thresholds. The vault enforces these rules at the API level — before any transaction is processed.

### 👤 2. Username Abstraction (Human-Centric Identity)
D'Uncle replaces complex 42-character blockchain addresses with simple **@usernames**. This abstracts the complexity of Web3, making the agentic economy accessible to non-technical users and enabling agent-to-agent payments via readable identifiers.

### 🧾 3. Global Ledger & Receipt System
Every transaction is recorded in a **high-performance NoSQL ledger** (DynamoDB), providing an immutable history of all agentic movements. Each payment generates:
- A unique **Transaction ID**
- A **UTC Timestamp**
- Sender / Receiver / Amount / Currency metadata

### 💰 4. Multi-Currency Vault
Support for local currencies (**PHP**) and stablecoins (**USDC / USDT**), enabling AI agents to operate globally and settle payments in the most cost-effective currency available.

---

## 🏗️ Technical Architecture

D'Uncle is built on a **Serverless Hybrid Stack** for maximum scalability and reliability.

```
                    ┌────────────────────────┐
                    │  Human User / AI Agent  │
                    └──────────┬─────────────┘
                               │
              ╔════════════════▼═══════════════════╗
              ║         Experience Layer            ║
              ║  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  ║
              ║     Colorful-Interface UI (Web)    ║
              ║  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘  ║
              ║  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  ║
              ║     JS Orchestrator / Fetch API    ║
              ║  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘  ║
              ╚════════════════╤═══════════════════╝
                               │
              ╔════════════════▼═══════════════════╗
              ║    Orchestration Layer (Flask)      ║
              ║  ┌─────────────────────────────┐   ║
              ║  │      REST API Gateway        │   ║
              ║  └──────────────┬──────────────┘   ║
              ║  ┌──────────────▼──────────────┐   ║
              ║  │     IAM Security Bridge      │   ║
              ║  └──────────────┬──────────────┘   ║
              ║  ┌──────────────▼──────────────┐   ║
              ║  │  Transaction & Policy Logic  │   ║
              ║  └─────────────────────────────┘   ║
              ╚══════╤════════════════════╤════════╝
                     │                   │
       ╔═════════════▼══╗    ╔═══════════▼══════════╗
       ║ Intelligence   ║    ║     Data Layer        ║
       ║ (Bedrock)      ║    ║   (DynamoDB)          ║
       ║ ┌────────────┐ ║    ║ ┌──────────────────┐ ║
       ║ │Intent Parse│ ║    ║ │ User Vault Table  │ ║
       ║ └─────┬──────┘ ║    ║ └──────────────────┘ ║
       ║ ┌─────▼──────┐ ║    ║ ┌──────────────────┐ ║
       ║ │Nova/Claude │ ║    ║ │Transaction Ledger│ ║
       ║ └────────────┘ ║    ║ └──────────────────┘ ║
       ╚════════════════╝    ╚══════════════════════╝
```

### Stack Summary

| Layer | Technology | Purpose |
|---|---|---|
| 🎨 Frontend | Tailwind CSS + Vanilla JS | Responsive, colorful doodle-inspired UI |
| ⚙️ Backend | Python 3.12 + Flask | REST API gateway, business logic, routing |
| 🧠 AI / LLM | Amazon Bedrock (Nova / Claude) | Intent parsing, agentic decision-making |
| 🗄️ Database | Amazon DynamoDB | Ultra-low latency state & transaction ledger |
| 🔐 Auth | AWS IAM | Secure, role-based cloud resource access |
| 🚀 Hosting | Replit / AWS EC2 | Development deployment on port 8080 |

---

## 📡 API Reference

All endpoints return structured JSON — fully compatible with Claude/GPT function-calling and agentic tool-use frameworks.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/balance/:username` | Fetch vault balance for a user |
| `POST` | `/register` | Create a new vault with a unique @username |
| `POST` | `/transfer` | Execute a fund transfer between two vaults |
| `POST` | `/set-limit` | Set or update a user's daily spending limit |
| `GET` | `/transactions/:username` | Retrieve full transaction ledger for a user |
| `POST` | `/agent/query` | Natural language agentic query via Bedrock LLM |

---

## 🛠️ Installation & Setup

### Prerequisites
- AWS Account with access to **Amazon Bedrock** and **Amazon DynamoDB**
- **Replit** account or **Python 3.12+** local environment
- AWS IAM user with `AmazonDynamoDBFullAccess` and `AmazonBedrockFullAccess` policies

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/duncle-vault.git
cd duncle-vault
```

### Step 2 — Create DynamoDB Tables

In the AWS Console → DynamoDB → **Create Table**:

| Table Name | Partition Key | Type |
|---|---|---|
| `DUncle_Users` | `username` | String |
| `DUncle_Transactions` | `transaction_id` | String |

> 💡 **Tip:** Enable DynamoDB Point-in-Time Recovery for production deployments.

### Step 3 — Configure Environment Variables

Set the following in your Replit Secrets panel or `.env` file:

```env
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=us-east-1
```

### Step 4 — Install Dependencies & Run

```bash
pip install flask boto3 python-dotenv
python main.py
```

D'Uncle will start on `http://localhost:8080` 🎉

---

## 🔐 Security Notes

- **Never commit** `.env` files or AWS credentials to version control. Use `.gitignore`.
- IAM credentials should follow **least privilege** — scope permissions to only DynamoDB and Bedrock.
- All spending-limit enforcement occurs **server-side** in the Transaction & Policy Logic layer, not in the frontend.
- For production, consider replacing IAM keys with **IAM Roles** (EC2 instance profile or ECS task role).

---

## 🎯 Future Roadmap

- [ ] **L2 Blockchain Settlement** — Migrate from DynamoDB to a Layer 2 chain (Polygon / Base) for on-chain, trustless transaction settlement
- [ ] **AI-Driven FX** — Integrate real-time exchange rate APIs so the Bedrock agent autonomously selects the most cost-effective settlement currency
- [ ] **Agent Marketplace** — A curated directory of pre-configured AI agents with dedicated D'Uncle budgets, hireable with a single click
- [ ] **Cross-Chain Identity** — Link @username to wallet addresses across Ethereum, Solana, and other chains for unified agentic identity
- [ ] **Spending Analytics Dashboard** — Real-time visual reporting for monitoring agent activity and flagging anomalies

---

## 🤝 Contributing

Contributions from developers, AI researchers, and Web3 builders are welcome!

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes with a clear message: `git commit -m "feat: add feature"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request with a short description of your changes

Please keep PRs focused and include relevant tests where applicable.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ☁️ **Amazon Bedrock** · 🐍 **Flask** · 🗄️ **DynamoDB** · 💚 and a lot of doodles

*D'Uncle — Empowering the Agentic Economy, one vault at a time 🌍*

</div>
