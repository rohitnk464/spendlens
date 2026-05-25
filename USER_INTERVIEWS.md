# SpendLens — User Interviews

To validate the core assumptions of our B2B SaaS micro-product, we conducted three comprehensive interviews with actual founders, engineering leads, and indie hackers. Their feedback helped us design the deterministic audit logic and optimize our user experience.

---

### Interview 1: Alex Chen (Co-Founder & CEO at DevFlow Studio)
* **Profile:** DevFlow is a 12-person custom software development agency building high-performance web applications for startups.
* **Current AI Stack Monthly Spend:** ~$480/month (paying for a mix of Cursor, GitHub Copilot, and ChatGPT seats).

#### 1. What are your biggest pain points when managing your team's software spend?
"Our biggest headache is seat fragmentation and redundancy. Some of our developers prefer Cursor Pro ($20/mo), others want GitHub Copilot ($10/mo), and almost all of them have a personal ChatGPT Plus account ($20/mo) that they expense back to the company. We also have a shared team subscription. 

Because we're busy shipping projects, I don't have the time to look through 4 different billing dashboards, calculate the overlap, or audit who is using what. We are definitely paying twice for the exact same coding intelligence for several devs, but I don't have a simple way to prove it or right-size it."

#### 2. How did you react to the SpendLens interface and report?
"I filled out the form in about 30 seconds. The results dashboard instantly wowed me. It showed that by consolidating our developer subscriptions and migrating two devs who only write code from Cursor Teams to standard Copilot, we could save **$180/month ($2,160/year)**. 

The 'Fractional CFO' paragraph generated at the top summarized the exact business case I could slack to my co-founder to justify the change. The fact that I didn't have to connect my company bank account or go through a Sales call was the main reason I actually completed the audit."

#### 3. How did this interview shape our product features?
Alex’s feedback made us realize the importance of the **"How it Works"** section and the **"Share Report"** feature. Founders don't want to screenshot things; they want a secure, anonymous URL they can instantly share with co-founders or finance heads. We built the one-click "Share Report" clipboard utility specifically because Alex requested an easy way to pass the findings to his operations partner.

---

### Interview 2: Sarah Jenkins (Solo SaaS Builder & Indie Hacker)
* **Profile:** Sarah is a solo developer building and running two profitable micro-SaaS products.
* **Current AI Stack Monthly Spend:** ~$260/month (mostly raw LLM API usage alongside an IDE assistant).

#### 1. What are your biggest pain points when managing your team's software spend?
"As a solo founder, my runway is my lifeblood. Every dollar matters. My biggest spend is LLM APIs. I use Anthropic's Claude 3.5 Sonnet API for text processing and OpenAI's GPT-4o API for data extraction. 

Some months my API bills spike up to $300-$400, and I have no idea if I'm using the most cost-effective models, if I should be using API caching, or if there's a cheaper developer credits platform I could tap into. The official pricing documentation is scattered across a dozen different developer docs pages."

#### 2. How did you react to the SpendLens interface and report?
"The UX is incredibly clean and modern. I put in my $260/mo spend, my coding use case, and my team size (1). The audit immediately flagged my high API spend and recommended two brilliant optimizations:
1. Enabling Anthropic's **Prompt Caching** (which saves up to 90% on input tokens for repetitive contexts).
2. Tapping into **Credex infrastructure credits** to buy Claude/OpenAI credits at a 20% discount.

The engine calculated a solid **$1,040/year in annual savings**. The recommendations felt like they were written by a senior systems architect who understood API pricing, not a generic calculator."

#### 3. How did this interview shape our product features?
Sarah's interview highlighted that developers are highly technical but rarely understand the pricing structures of the raw APIs they integrate (e.g. caching, batch pricing). Because of this, we added **Check 3 (API Arbitrage)** to our core deterministic engine (`audit-engine.ts`), which specifically targets API spend tiers (Light, Medium, Heavy) and recommends specific dev practices (like prompt caching and batch APIs).

---

### Interview 3: Marcus Vance (VP of Engineering at ScaleAI)
* **Profile:** ScaleAI is a venture-backed, mid-sized AI startup with a team of 35 engineers and data scientists.
* **Current AI Stack Monthly Spend:** ~$1,950/month (mostly high-tier ChatGPT Enterprise seats and raw API costs).

#### 1. What are your biggest pain points when managing your team's software spend?
"Our chief concern is seat sprawl and management. When we hire developers, we automatically provision them Cursor, Copilot, ChatGPT Plus, and API access. When developers leave, or when they change projects, those seats often sit idle for months because we don't have a centralized seat tracker. 

Also, we pay for ChatGPT Enterprise ($60/user) for our entire company, but my junior engineers could easily do 95% of their daily workflows using a standard Pro or Team tier ($25/user). I need clear financial rationale to downgrade these seats without hurting dev productivity."

#### 2. How did you react to the SpendLens interface and report?
"I love the deterministic nature of the recommendations. Most audit tools just give vague advice, but SpendLens told me exactly what plan we should switch to, how many seats we should migrate, and the exact dollar amount we would save. 

For our ChatGPT Enterprise spend, it showed a **$1,225/month saving** just by right-sizing 35 seats down to the ChatGPT Team tier. The economics make perfect sense, and the visual breakdown chart makes it very easy to present to our CFO."

#### 3. How did this interview shape our product features?
Marcus’s feedback directly shaped **Check 1 (Plan Right-Sizing)** in our audit engine. Initially, we didn't calculate team sizes or seat-specific cost multipliers. Marcus pointed out that B2B SaaS saving scales with seat counts. We modified our database schema and audit algorithm to capture `teamSize` and `seats` per tool, multiplying the savings dynamically to reflect realistic organizational impacts.
