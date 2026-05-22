# 🤝 Contributing to D'Uncle Vault

Welcome to the D'Uncle team! This guide explains how we collaborate on this repo using **GitHub + GitHub Copilot**. Please read before making your first contribution.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Branch Rules](#branch-rules)
- [Our Workflow](#our-workflow)
- [Commit Message Format](#commit-message-format)
- [Pull Request Guide](#pull-request-guide)
- [Copilot Code Review](#copilot-code-review)
- [Environment Setup](#environment-setup)
- [Need Help?](#need-help)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/oconchristopher08/d_uncle.git
cd d_uncle
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up your environment variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env
```

Required variables:

```
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
DYNAMODB_TABLE=DUncle_Users
DYNAMODB_LEDGER_TABLE=DUncle_Transactions
```

> ⚠️ **Never commit your `.env` file.** It is already in `.gitignore`.

---

## Branch Rules

The `main` branch is **protected**. Direct pushes are blocked for everyone except the repo admin.

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code only. Never push here directly. |
| `feature/your-feature` | New features or UI changes |
| `fix/bug-name` | Bug fixes |
| `chore/task-name` | Refactors, config updates, dependency bumps |
| `docs/what-you-changed` | Documentation updates |

### Branch naming examples

```
feature/vault-ui-redesign
feature/fx-rate-integration
fix/transfer-policy-bug
chore/update-dependencies
docs/api-reference-update
```

---

## Our Workflow

Follow these steps every time you contribute:

### Step 1 — Sync with main before starting

```bash
git checkout main
git pull origin main
```

### Step 2 — Create your feature branch

```bash
git checkout -b feature/your-feature-name
```

### Step 3 — Make your changes and commit

```bash
git add .
git commit -m "feat: describe what you did"
```

### Step 4 — Push your branch

```bash
git push origin feature/your-feature-name
```

### Step 5 — Open a Pull Request

Go to the repo on GitHub → you'll see a prompt to open a PR from your branch. Click it, fill in the description, and submit.

### Step 6 — Wait for Copilot + teammate review

Copilot will automatically review your PR. Address any comments, then get at least **1 human approval** before merging.

### Step 7 — Merge and clean up

Once approved, merge to `main` and delete your feature branch.

---

## Commit Message Format

We use a simple prefix system so the git log stays readable:

| Prefix | When to use |
|--------|-------------|
| `feat:` | New feature or UI addition |
| `fix:` | Bug fix |
| `chore:` | Config, deps, refactor (no new feature) |
| `docs:` | Documentation only |
| `style:` | Formatting, no logic change |
| `test:` | Adding or updating tests |

### Examples

```
feat: add multi-currency vault selector
fix: correct DynamoDB ledger timestamp format
chore: bump boto3 to latest version
docs: update API reference for /vault/create
```

Keep messages short and in the present tense. One line is enough for most commits.

---

## Pull Request Guide

When opening a PR, use this template for the description:

```
## What does this PR do?
Brief description of the change.

## Type of change
- [ ] New feature
- [ ] Bug fix
- [ ] Refactor / chore
- [ ] Documentation

## How to test
Steps to verify the change works.

## Screenshots (if UI change)
Paste before/after screenshots here.
```

### PR rules

- PRs must target `main`
- At least **1 approval** required before merging
- Copilot review is automatic — read its comments before requesting human review
- Do not merge your own PR without at least one teammate approval

---

## Copilot Code Review

Every PR automatically gets reviewed by **GitHub Copilot**. Here's how to work with it:

1. Open your PR — Copilot will appear as a reviewer within a minute or two
2. Read its inline comments carefully — it flags bugs, logic issues, and security concerns
3. If you agree with a suggestion, apply it and push a new commit
4. If you disagree, leave a reply explaining why — that's totally fine
5. After addressing Copilot's comments, request a human reviewer

> Copilot review does **not** replace human review. Both are required.

---

## Environment Setup

### Python backend

```bash
pip install -r requirements.txt
python main.py
# Runs at http://localhost:8080
```

### Frontend (if working on UI)

```bash
pnpm dev
```

### AWS / DynamoDB

Make sure your IAM user has:
- `AmazonDynamoDBFullAccess`
- `AmazonBedrockFullAccess`

Tables required:
- `DUncle_Users` — partition key: `username`, sort key: `vault_id`
- `DUncle_Transactions` — partition key: `transaction_id`, sort key: `timestamp`

---

## Need Help?

- Open a [GitHub Issue](https://github.com/oconchristopher08/d_uncle/issues) for bugs or feature requests
- Tag `@oconchristopher08` in a PR comment if you're stuck
- Check the [README](./README.md) for full architecture and API reference

---

*D'Uncle — Empowering the Agentic Economy, one vault at a time. 🌍*
