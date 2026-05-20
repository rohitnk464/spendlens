# SpendLens — AI Spend Audit Tool

> **SpendLens** is a free, instant audit tool designed for startup founders and engineering managers to analyze their team's AI tool subscriptions. It evaluates current spend across major AI tools (Cursor, Copilot, Claude, ChatGPT, etc.), identifies overspending or suboptimal plans, and surfaces actionable savings—including discounted AI infrastructure credits through Credex.

**Live URL:** *(To be added upon deployment)*

---

## 📸 Screenshots

*(Screenshots or a 30-second Loom recording will be added here on Day 7 when the UI is fully complete)*
- [ ] Screenshot 1: Landing Page
- [ ] Screenshot 2: Spend Input Form
- [ ] Screenshot 3: Audit Results & Savings Breakdown

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Rename `.env.example` to `.env.local` and add your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run Tests
```bash
npm run test:run
```

### 5. Deploy
This project is optimized for deployment on Vercel. Simply connect your GitHub repository to Vercel, and it will automatically build using the default Next.js preset.

---

## 🧠 Decisions (Trade-offs Made)

1. **Next.js App Router over Vanilla React (Vite):** Chose Next.js for its built-in Server Components and API routes. This allows us to handle the Anthropic/Gemini API calls securely on the backend without needing a separate Express server, and provides SSR for generating dynamic Open Graph tags for the shareable URLs.
2. **Supabase over Firebase/MongoDB:** Selected Supabase (Postgres) because relational data works perfectly for linking `Leads` to specific `Audits`. The `@supabase/ssr` package also integrates seamlessly with Next.js App Router for secure server-side fetching.
3. **Hardcoded Pricing Data vs. Scraping:** Decided to hardcode the pricing data (`lib/pricing-data.ts`) rather than attempting to live-scrape vendor sites. Pricing pages change layout frequently, making scrapers brittle. A hardcoded, verified list is deterministic and ensures the audit engine's math is flawlessly accurate.
4. **Deterministic Audit Engine over LLM Math:** Built the core audit logic using hardcoded TypeScript rules rather than asking an LLM to calculate savings. LLMs are prone to hallucinating math. The deterministic engine ensures finance-grade accuracy, reserving the LLM solely for the personalized text summary.
5. **Tailwind CSS 4 + inline theming:** Adopted the bleeding-edge Tailwind 4 syntax (`@theme inline`) to reduce config bloat and leverage native CSS variables for the dark/glassmorphism design system. It drops the need for `tailwind.config.js` and improves build performance.
