# SpendLens Architecture

SpendLens is a B2B micro-SaaS that helps founders, indie hackers, and agency owners optimize their AI tool stack and reduce monthly burn. 

The application is designed to be **fast, secure, and highly deterministic**. Instead of relying purely on LLMs to guess pricing, it uses a hardcoded deterministic engine to calculate exact financial overlaps, and then leverages Google Gemini strictly for qualitative executive summaries.

## Tech Stack Overview

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + Framer Motion
- **Database / Auth:** Supabase (PostgreSQL)
- **AI Integration:** Google Gemini 2.5 Flash (`@google/genai` SDK)
- **Transactional Emails:** Resend
- **Deployment:** Vercel

---

## Core System Architecture

### 1. The Audit Flow (Client to Server)

The core user journey consists of three steps, moving from a fully static client experience to a highly secure server-side execution environment.

1. **Client-Side Form (`SpendForm.tsx`)**: 
   - A multi-step React form built with Radix UI primitives and Framer Motion. 
   - State is persisted to `localStorage` so users don't lose progress if they accidentally refresh the page.
   
2. **The API Route (`/api/audit/route.ts`)**: 
   - When the user submits the form, a `POST` request is sent to the server.
   - The server validates the payload and passes it into the Deterministic Engine.
   - The resulting financial calculation is securely saved to the Supabase database.
   - The API returns a UUID (e.g., `spendlens.com/audit/[uuid]`) which acts as a secure, shareable link for the user's report.

### 2. The Deterministic Evaluation Engine (`audit-engine.ts`)

LLMs are notoriously bad at math and prone to hallucinating pricing structures. Because SpendLens handles financial data, we built a **deterministic evaluation engine** in plain TypeScript.

The engine executes 4 strict checks:
1. **Plan Right-Sizing:** Checks if the user is paying for an Enterprise plan but has a team size small enough to downgrade to a Pro/Team plan.
2. **Cheaper Alternatives:** Analyzes feature overlaps (e.g., Cursor vs. Copilot) and recommends the cheaper alternative based on the user's specific use-case.
3. **API Arbitrage:** Detects if the user is overpaying for ChatGPT Plus seats and recommends switching to the raw OpenAI/Anthropic APIs if they are heavily using custom infrastructure.
4. **Partner Discounts:** Recommends platform-level credits (e.g., Credex) to slash remaining costs by a flat percentage.

*The engine is fully unit-tested using Vitest to guarantee 100% financial accuracy.*

### 3. The AI Integration (Google Gemini)

While the math is deterministic, humans prefer qualitative, narrative advice. 

Once the user views their secure audit URL (`/audit/[id]`), the `AISummary.tsx` Server Component dynamically triggers the **Google Gemini 2.5 Flash** model.
- We pass the exact deterministic financial output as a JSON string to Gemini.
- Gemini is prompted to act as a "Fractional CFO" and write a personalized, 3-sentence executive summary explaining *why* the user should make the recommended switches.
- **Why Gemini 2.5 Flash?** We chose Flash because it offers sub-second latency, meaning the personalized summary streams into the UI almost instantaneously without blocking the page load.

### 4. Lead Capture & Email (Resend + Supabase)

At the bottom of the audit report, users are prompted to email the results to themselves.
1. The user inputs their email into `LeadCaptureForm.tsx`.
2. A hidden "honeypot" field traps automated spam bots, preventing database bloat.
3. The email and audit ID are saved to the `leads` table in Supabase via `/api/lead/route.ts`.
4. The server triggers the **Resend API** to dispatch a beautifully formatted React Email containing a link to their secure report.

### 5. Security & Edge Cases

- **Row Level Security (RLS):** Enabled on all Supabase tables. The browser client cannot read or write to the database directly. All database mutations happen securely within Next.js API Routes using the `SUPABASE_SERVICE_ROLE_KEY`.
- **Bot Mitigation:** Simple in-memory rate limiting restricts API calls to 5 per minute per IP address, protecting our Resend quota and Database limits from DDoS attacks.
- **No PII:** We deliberately do not ask for Company Names, Bank Accounts, or Plaid integrations. The audit is completely anonymous until the user willingly provides their email at the very end of the flow.
