# SpendLens 🔍

**Stop burning cash on redundant AI tools.**
SpendLens is a blazing fast B2B micro-SaaS that instantly audits your entire AI software stack, calculates overlaps using deterministic math, and uses Google Gemini to recommend cheaper, more efficient alternatives.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://spendlens-five-lemon.vercel.app/)

## 🚀 The Problem
Startups and agencies are bleeding cash by paying for ChatGPT Enterprise, Anthropic Pro, GitHub Copilot, and Cursor all at the same time. The features overlap, but nobody wants to do the math to figure out what they actually need. 

## 💡 The Solution
SpendLens allows you to input your current AI stack in 30 seconds. We run it through our deterministic pricing engine and instantly generate a secure, personalized dashboard showing you exactly how much you can save, and exactly which tools you should downgrade or swap.

### Features
- **Instant Financial Audit:** Calculates exact annual savings by cross-referencing official pricing tiers.
- **AI "Fractional CFO":** Uses Google Gemini 2.5 Flash to generate a personalized executive summary of your audit in sub-seconds.
- **Lead Capture:** Sends beautifully formatted PDF reports to users via Resend, capturing their email for your marketing pipeline.
- **Extremely Secure:** Zero PII required. No bank integrations. All audits are secured behind UUIDs in Supabase.

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 + Framer Motion
- **Database:** Supabase (PostgreSQL)
- **AI:** Google Gemini API (`@google/genai`)
- **Email:** Resend
- **Deployment:** Vercel

## 📖 Hackathon Documentation

We didn't just build a toy; we built a viable business. Please review our strategic documentation:
1. **[Architecture Overview](./ARCHITECTURE.md)** - How our deterministic engine works alongside LLMs.
2. **[Go-To-Market Strategy](./GTM.md)** - How we plan to acquire our first 1,000 users.
3. **[Unit Economics](./ECONOMICS.md)** - How SpendLens makes money (hint: high-margin lead generation).
4. **[Landing Page Copy](./LANDING_COPY.md)** - Our exact copywriting framework.

---

## 💻 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rohitnk464/spendlens.git
   cd spendlens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Google Gemini API
   GEMINI_API_KEY=your_gemini_key

   # Resend Email API
   RESEND_API_KEY=your_resend_key

   # Supabase Database
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🧪 Testing

We use Vitest to guarantee the accuracy of our financial deterministic engine.
```bash
npm run test
```
