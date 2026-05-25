# SpendLens — Test Documentation

To ensure complete financial and logical accuracy, SpendLens implements a robust, automated unit-testing suite for its Core Audit Engine. Since we handle corporate SaaS spend audits, all calculations and downgrades must be deterministic and fully verified before reaching production.

---

## 🧪 Testing Environment

* **Framework:** [Vitest](https://vitest.dev/)
* **Environment:** Node.js / happy-dom (for fast, lightweight headless testing)
* **Configuration File:** `vitest.config.ts`
* **Setup File:** `vitest.setup.ts`

Our tests run natively in TypeScript, leveraging Vitest's sub-second hot-reloads and strict type-safety checks.

---

## 📋 List of Automated Unit Tests

All test cases are located in [src/\_\_tests\_\_/audit-engine.test.ts](file:///c:/Users/Rohit%20M/Desktop/credex/src/__tests__/audit-engine.test.ts) and verify the deterministic audit logic under various corporate team sizes, use cases, and tool stacks.

### 1. Solo developer on Cursor Teams → recommends downgrade to Pro
* **Objective:** Verifies that if a company has a team size of 1 but is paying for a higher-tier team subscription, the engine flags it.
* **Input Scenario:** 1 user, coding focus, subscribed to `Cursor Teams` ($40/user).
* **Expected Output:**
  * Recommendation: `downgrade`
  * Recommended Plan: `Cursor Pro` ($20/user)
  * Monthly Savings: **$20/month**
  * Reasoning: Includes *"team admin features aren't needed at this size"*.

### 2. Team of 3 on ChatGPT Enterprise → recommends Team plan
* **Objective:** Verifies that a small team using high-cost Enterprise tiers is correctly steered toward standard collaboration tiers.
* **Input Scenario:** 3 users, mixed use-case, subscribed to `ChatGPT Enterprise` ($60/user, total $180/mo).
* **Expected Output:**
  * Recommendation: `downgrade`
  * Recommended Plan: `ChatGPT Team` ($25/user, total $75/mo)
  * Monthly Savings: **$105/month**

### 3. Already optimal setup → returns $0 savings
* **Objective:** Verifies that if a user is already on the most efficient plan, the engine doesn't generate false savings recommendations.
* **Input Scenario:** 1 user, coding focus, subscribed to `GitHub Copilot Pro` ($10/user).
* **Expected Output:**
  * Recommendation: `keep`
  * Monthly Savings: **$0/month**
  * Reasoning: Contains *"already on the optimal plan"*.

### 4. Coding use case suggests cheaper alternative (Copilot vs Cursor)
* **Objective:** Verifies that for a coding-specific use case, the engine recommends the cheapest coding assistant (GitHub Copilot) over standard Cursor Pro.
* **Input Scenario:** 1 user, coding focus, subscribed to `Cursor Pro` ($20/user).
* **Expected Output:**
  * Recommendation: `switch`
  * Alternative Tool: `GitHub Copilot`
  * Monthly Savings: **$10/month** (Cursor Pro $20 vs Copilot Pro $10)

### 5. High API spend → suggests batch API optimization
* **Objective:** Verifies that heavy API developers are prompted to use modern cost-saving developer features (like prompt caching or batch pipelines).
* **Input Scenario:** 5 users, data focus, subscribed to `Anthropic API (Heavy)` ($800/month spend).
* **Expected Output:**
  * Recommendation: `optimize`
  * Monthly Savings: **$400/month** (applying a conservative 50% saving via Batch API or caching)
  * Reasoning: Explicitly mentions *"Batch API"*.

### 6. Multiple tools → total savings calculated correctly
* **Objective:** Verifies that the engine aggregates individual tool savings into a single, accurate total savings sum.
* **Input Scenario:** 1 user, coding focus, holding both `Cursor Teams` ($40/mo, saves $20) and `Anthropic API (Heavy)` ($800/mo, saves $400).
* **Expected Output:**
  * Total Monthly Savings: **$420/month**
  * Total Annual Savings: **$5,040/year** ($420 * 12)

### 7. Savings tier classification works
* **Objective:** Verifies that audits are correctly bucketed into strategic savings tiers for marketing segmentation.
* **Input Scenario A:** Anthropic API ($1,500/mo spend, saves $750) → Expected Tier: `high` (Savings > $500/mo)
* **Input Scenario B:** ChatGPT Enterprise ($180/mo spend, saves $105) → Expected Tier: `medium` (Savings $100 - $500/mo)

---

## 🚀 How to Run the Tests

### 1. Locally
Ensure dependencies are installed first:
```bash
npm install
```

To run the unit tests in **interactive/watch mode** (re-runs automatically on file edits):
```bash
npm run test
```

To run a **one-time, complete execution pass** (ideal for pre-commit hooks or local verification):
```bash
npm run test:run
```

### 2. In Continuous Integration (CI)
We have configured a GitHub Actions CI workflow in `.github/workflows/ci.yml`. On every pull request or main-branch commit, the CI pipeline automatically:
1. Installs Node.js and all project dependencies.
2. Checks for linting/formatting errors.
3. Runs `npm run test:run` to ensure all 7 unit tests pass.
4. Validates that Next.js successfully compiles without warnings.
