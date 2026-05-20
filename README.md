# 🌍 D'Uncle — The Global AI Vault
> **The Sovereign Financial Layer for the Agentic Web**

[![AWS Bedrock](https://img.shields.io/badge/AWS-Bedrock-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/bedrock/)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-Backend-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![DynamoDB](https://img.shields.io/badge/DynamoDB-Data_Layer-4053D6?style=for-the-badge&logo=amazondynamodb&logoColor=white)](https://aws.amazon.com/dynamodb/)
[![Status](https://img.shields.io/badge/Status-Experimental-orange?style=for-the-badge)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

---

## 📋 Table of Contents

- [Executive Summary](#-executive-summary)
- [Problem Statement](#-problem-statement)
- [Core Solution](#-core-solution)
- [Key Features](#-key-features)
- [AI Integration Layer](#-ai-integration-layer)
- [System Architecture](#-system-architecture)
- [Security Model](#-security-model)
- [API Reference](#-api-reference)
- [Transaction Flow](#-example-transaction-flow)
- [Use Cases](#-use-cases)
- [Installation & Setup](#️-installation--setup)
- [Scalability Strategy](#-scalability-strategy)
- [Roadmap](#-roadmap)
- [Compliance & Risk Disclaimer](#️-compliance--risk-disclaimer)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧠 Executive Summary

**D'Uncle** is an AI-native financial orchestration platform built for the emerging **Agentic Economy** — a future where autonomous AI agents transact, negotiate, and execute tasks on behalf of humans.

While modern AI models can reason, plan, and automate complex workflows, they still lack:

- ❌ Secure fund management
- ❌ Programmable spending controls
- ❌ Identity abstraction
- ❌ Reliable payment execution

D'Uncle solves this by introducing a **Sovereign Vault System**: a programmable financial layer where AI agents can securely manage balances, execute micropayments, and operate within human-defined governance policies.

The platform combines **AI orchestration**, **serverless infrastructure**, **programmable guardrails**, and **multi-currency support** to enable safe autonomous commerce at global scale.

---

## 🔍 Problem Statement

AI agents are becoming increasingly capable — but they cannot safely participate in real-world financial systems.

| Limitation | Impact |
|---|---|
| No native financial identity | Agents can't be trusted with funds |
| Unsafe autonomous spending | Risk of runaway or malicious transactions |
| Complex blockchain UX | Mainstream adoption barrier |
| Lack of auditability | No accountability for agent actions |
| No programmable governance layer | Humans can't set safe boundaries |
| Poor cross-border payment interoperability | Global deployment is impractical |

> **The "Last Mile Problem" of AI:**
> AI can think and decide — but it cannot securely transact.
>
> D'Uncle bridges this gap.

---

## 💡 Core Solution

D'Uncle provides:

- 🔐 **AI-controlled vaults** with programmable spending policies
- 👤 **Identity abstraction** via human-readable @usernames
- 🌐 **Multi-currency financial routing** (fiat + stablecoins)
- 🧾 **Transaction audit systems** for full accountability
- ⛓️ **Future-ready blockchain settlement** infrastructure

All delivered through a simplified, human-centric interface designed for both technical and non-technical users.

---

## 🚀 Key Features

### 🛡️ 1. Sovereign Vault System

Each AI agent operates inside a **programmable vault environment** with configurable financial boundaries.

**Vault capabilities:**
- Daily spending limits
- Per-transaction caps
- Currency restrictions
- Human approval checkpoints
- Emergency freeze controls

```json
{
  "vault_id": "vault_xstarlight_001",
  "daily_limit": 50.00,
  "currency": "USDC",
  "approval_required_above": 20.00,
  "status": "active",
  "freeze_enabled": false
}
```

This ensures autonomous agents **cannot exceed predefined financial boundaries** under any condition.

---

### 👤 2. Human-Centric Identity Layer

Instead of exposing raw blockchain addresses:

```
0xA94f5374Fce5edBC8E2a8697C15331677e6EbF0B
```

D'Uncle uses simple, readable identifiers:

```
@xstarlight
@merchant_ai
@agent404
```

**Benefits:**
- Easier onboarding for non-technical users
- Reduced transaction errors
- Social-style payment interactions
- Cross-chain identity mapping (roadmap)

---

### 🧾 3. Global Ledger & Audit Trail

Every transaction is stored in a **high-performance immutable ledger**. Each record contains:

| Field | Description |
|---|---|
| `transaction_id` | Unique identifier (UUID) |
| `timestamp` | UTC ISO 8601 datetime |
| `sender` | @username or agent_id |
| `receiver` | @username or agent_id |
| `currency` | USD / PHP / USDC / USDT |
| `amount` | Decimal value |
| `agent_action_context` | What the agent was doing |
| `status` | `pending` / `confirmed` / `failed` |

This enables **transparency**, **auditability**, **dispute tracking**, and **AI behavior monitoring**.

---

### 💰 4. Multi-Currency AI Vault

| Currency | Type | Status |
|---|---|---|
| PHP | Local Fiat | ✅ Supported |
| USD | Local Fiat | ✅ Supported |
| USDC | Stablecoin | ✅ Supported |
| USDT | Stablecoin | ✅ Supported |
| EUR | Fiat | 🔜 Roadmap |
| JPY | Fiat | 🔜 Roadmap |
| CBDCs | Gov. Digital | 🔜 Roadmap |
| L2 Stable Assets | On-chain | 🔜 Roadmap |

AI agents can optimize **payment routing and settlement costs** globally based on real-time FX data (roadmap).

---

## 🧠 AI Integration Layer

D'Uncle integrates with large language models to power agentic financial decision-making.

**Integrated platforms:**
- Amazon Bedrock (Nova / Claude)
- Anthropic Claude models
- Future: multi-model orchestration

**AI capabilities:**

| Capability | Description |
|---|---|
| Intent Parsing | Understand natural language financial commands |
| Transaction Classification | Categorize spend type automatically |
| Fraud Detection | Flag anomalous agent behavior |
| Policy Interpretation | Enforce spending rules in context |
| Autonomous Routing Decisions | Select optimal payment path |

---

## 🏗️ System Architecture

### Architecture Diagram

```
                    ┌─────────────────────────┐
                    │   Human User / AI Agent  │
                    └────────────┬────────────┘
                                 │
               ╔═════════════════▼══════════════════╗
               ║          Experience Layer           ║  ← Tailwind CSS UI
               ║  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ ║
               ║       Colorful-Interface Web UI     ║
               ║  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ ║
               ║  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ ║
               ║      JS Orchestrator / Fetch API    ║
               ║  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ ║
               ╚═════════════════╤══════════════════╝
                                 │
               ╔═════════════════▼══════════════════╗
               ║       Orchestration Layer           ║  ← Flask / Python
               ║  ┌─────────────────────────────┐   ║
               ║  │       REST API Gateway       │   ║
               ║  └──────────────┬──────────────┘   ║
               ║  ┌──────────────▼──────────────┐   ║
               ║  │      IAM Security Bridge     │   ║
               ║  └──────────────┬──────────────┘   ║
               ║  ┌──────────────▼──────────────┐   ║
               ║  │  Transaction & Policy Logic  │   ║
               ║  └─────────────────────────────┘   ║
               ╚══════╤═══════════════════╤═════════╝
                      │                   │
        ╔═════════════▼═══╗   ╔═══════════▼══════════╗
        ║ Intelligence    ║   ║     Data Layer        ║
        ║ Amazon Bedrock  ║   ║  Amazon DynamoDB      ║
        ║ ┌─────────────┐ ║   ║ ┌──────────────────┐ ║
        ║ │Intent Parser│ ║   ║ │  User Vault Table │ ║
        ║ └──────┬──────┘ ║   ║ └──────────────────┘ ║
        ║ ┌──────▼──────┐ ║   ║ ┌──────────────────┐ ║
        ║ │Nova / Claude│ ║   ║ │Transaction Ledger │ ║
        ║ └─────────────┘ ║   ║ └──────────────────┘ ║
        ╚═════════════════╝   ╚══════════════════════╝
```

### Infrastructure Stack

| Layer | Technology | Role |
|---|---|---|
| 🎨 Frontend | Tailwind CSS + Vanilla JS | Responsive, human-centric UI |
| ⚙️ Backend | Python 3.12 + Flask | API gateway, business logic, routing |
| 🧠 AI / LLM | Amazon Bedrock (Nova / Claude) | Intent parsing, autonomous decisions |
| 🗄️ Database | Amazon DynamoDB | Low-latency state & transaction ledger |
| 🔐 Auth | AWS IAM | Role-based cloud resource access |
| 🚀 Hosting | Replit / AWS EC2 | Dev: port 8080 / Prod: EC2 or Fargate |
| ⛓️ Settlement (roadmap) | Layer 2 Blockchain | On-chain trustless settlement |

---

## 🔒 Security Model

### Current Security Measures

**Authentication**
- AWS IAM role-based permissions
- API secret isolation via environment variables
- No credentials exposed to frontend

**Financial Guardrails**
- Daily transaction limits enforced server-side
- Spending thresholds per vault
- Policy-based execution rules validated before any payment

**Data Security**
- Secure transaction logging with immutable timestamps
- DynamoDB encryption at rest (AWS managed keys)
- Environment-level secret management

### Planned Security Enhancements

| Enhancement | Priority | Status |
|---|---|---|
| Multi-factor authentication (MFA) | High | 🔜 Planned |
| Wallet signature verification | High | 🔜 Planned |
| Vault encryption-at-rest (customer-managed) | High | 🔜 Planned |
| AI behavioral anomaly detection | Medium | 🔜 Planned |
| Rate limiting & abuse prevention | High | 🔜 Planned |
| Transaction simulation before execution | Medium | 🔜 Planned |
| Human-in-the-loop approval flows | High | 🔜 Planned |
| Threat model documentation | Medium | 🔜 Planned |

---

## 📡 API Reference

All endpoints return structured JSON. Responses are fully compatible with Claude / GPT function-calling and agentic tool-use frameworks.

### Base URL
```
http://localhost:8080/api/v1
```

### Endpoints

#### Create Vault
```http
POST /api/v1/vault/create
```
```json
{
  "username": "@xstarlight",
  "currency": "USDC",
  "daily_limit": 50.00
}
```

#### Transfer Funds
```http
POST /api/v1/transfer
```
```json
{
  "from": "@agent404",
  "to": "@merchant_ai",
  "amount": 5.00,
  "currency": "USDC",
  "memo": "API subscription payment"
}
```

#### Get Balance
```http
GET /api/v1/balance/{username}
```

#### Get Transaction Ledger
```http
GET /api/v1/ledger/{username}
```

#### Update Spending Policy
```http
POST /api/v1/policy/update
```
```json
{
  "username": "@agent404",
  "daily_limit": 25.00,
  "approval_required_above": 10.00
}
```

#### Agentic Natural Language Query
```http
POST /api/v1/agent/query
```
```json
{
  "username": "@xstarlight",
  "query": "Pay @merchant_ai $3 USDC for the image generation API call"
}
```

---

## 🔄 Example Transaction Flow

```
1.  User funds AI Vault via the D'Uncle interface
        ↓
2.  AI agent receives a task (e.g. "purchase API access")
        ↓
3.  Bedrock LLM parses agent intent into a structured transaction
        ↓
4.  D'Uncle validates against vault spending policy
        ↓
5.  If within limits → transaction executes
    If above threshold → human approval requested
        ↓
6.  Payment sent to receiver vault
        ↓
7.  Ledger records full transaction with timestamp & context
        ↓
8.  Receipt generated and returned to agent + user
```

---

## 🌐 Use Cases

| Use Case | Description |
|---|---|
| 🛒 AI Commerce Agents | Autonomous agents purchasing APIs, subscriptions, or digital goods on behalf of users |
| 🎨 Creator Economy | AI assistants managing monetization flows for content creators |
| 💸 Cross-Border Micropayments | Fast, low-cost settlements between global users via stablecoins |
| 🤖 Autonomous SaaS Billing | AI services paying for compute and infrastructure automatically |
| 📦 Agent Marketplace | Pre-funded AI workers available for hire with defined budget caps |
| 🏦 AI Treasury Management | Organizations delegating budget management to governed AI agents |

---

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.12+
- AWS Account with **Amazon Bedrock** and **Amazon DynamoDB** access
- AWS IAM user with `AmazonDynamoDBFullAccess` and `AmazonBedrockFullAccess`
- Replit account or Linux/macOS environment

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/duncle-vault.git
cd duncle-vault
```

### Step 2 — Create DynamoDB Tables

In AWS Console → DynamoDB → **Create Table**:

| Table Name | Partition Key | Sort Key | Type |
|---|---|---|---|
| `DUncle_Users` | `username` | `vault_id` | String |
| `DUncle_Transactions` | `transaction_id` | `timestamp` | String |

**Recommended Global Secondary Indexes:**
- `agent_id-index`
- `timestamp-index`
- `receiver-index`

### Step 3 — Configure Environment Variables

Create a `.env` file in the project root (never commit this):

```env
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
DYNAMODB_TABLE=DUncle_Users
DYNAMODB_LEDGER_TABLE=DUncle_Transactions
```

> ⚠️ Add `.env` to your `.gitignore` immediately.

### Step 4 — Install Dependencies & Run

```bash
pip install -r requirements.txt
python main.py
```

Server starts at `http://localhost:8080` 🎉

### `requirements.txt`

```
flask
boto3
python-dotenv
uuid
```

---

## 📈 Scalability Strategy

D'Uncle is architected for horizontal scalability from day one.

| Goal | Approach |
|---|---|
| Stateless backend | Flask app holds no session state — scale horizontally |
| Serverless compute | Ready for AWS Lambda / Fargate migration |
| Event-driven transactions | DynamoDB Streams for async ledger processing |
| Horizontal DB scaling | DynamoDB auto-scaling by default |
| Multi-region deployment | Route 53 + DynamoDB Global Tables (roadmap) |
| Edge-based API routing | CloudFront + API Gateway for low-latency global access |

---

## 🛣️ Roadmap

### Phase 1 — AI Vault Infrastructure ✅
- [x] Core vault system
- [x] DynamoDB ledger architecture
- [x] Programmable spending policies
- [x] Multi-currency support (PHP, USD, USDC, USDT)
- [x] IAM security integration
- [x] Amazon Bedrock intent parsing

### Phase 2 — Intelligent Financial Routing 🔜
- [ ] Real-time FX rate integration
- [ ] AI-driven transaction cost optimization
- [ ] Smart fee routing
- [ ] Spending analytics dashboard

### Phase 3 — Blockchain Settlement 🔜
- [ ] Layer 2 integration (Polygon / Base)
- [ ] On-chain receipt generation
- [ ] Stablecoin settlement rails
- [ ] Cross-chain identity linking

### Phase 4 — Agent Marketplace 🔜
- [ ] Deployable AI worker registry
- [ ] Pre-funded agent templates
- [ ] Shared autonomous economy primitives
- [ ] Agent reputation & performance tracking

---

## ⚠️ Compliance & Risk Disclaimer

> **Important:** D'Uncle is currently an **experimental AI financial orchestration platform** in active development.

The platform **does not currently**:
- Operate as a licensed bank or financial institution
- Custody regulated securities
- Provide financial investment advice or services
- Guarantee transaction finality or fund recovery

**Future deployments involving real financial infrastructure may require:**
- KYC / AML compliance procedures
- Money transmission licensing (varies by jurisdiction)
- Stablecoin regulatory review
- Regional financial authority approvals (BSP, FinCEN, FCA, etc.)

Users and integrators are responsible for ensuring compliance with applicable laws in their jurisdiction before deploying D'Uncle in production financial environments.

---

## 🤝 Contributing

Contributions from developers, AI researchers, and Web3 builders are welcome.

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: describe your change"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request with a clear description

**Areas we especially need help with:**
- SDK examples (Python, JS)
- Webhook event system
- Test coverage
- CI/CD pipeline setup
- Threat model documentation

Please review [CONTRIBUTING.md](CONTRIBUTING.md) before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with** ☁️ Amazon Bedrock · 🐍 Flask · 🗄️ DynamoDB · 🔐 AWS IAM

*D'Uncle — Empowering the Agentic Economy, one vault at a time. 🌍*

---

⭐ If this project resonates with you, give it a star and share it with a builder.

</div>
