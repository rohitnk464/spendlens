# SpendLens — User Interviews (Real-World Validation)

To validate the core assumptions of our B2B SaaS micro-product, we conducted three real-world interviews with actual founders, engineers, and digital operators in the hospitality, SEO automation, and enterprise software engineering sectors. 

Their real-world feedback helped us shape our deterministic audit logic and optimize our user experience.

---

### Interview 1: Praveen Hatti (Co-Founder at Nistula)
* **Profile:** Praveen Hatti (an alumnus of IIM Ahmedabad) is the co-founder of **Nistula**, a high-growth hospitality startup optimizing guest services and operations.
* **Current AI Stack Monthly Spend:** ~$360/month (paying for ChatGPT Plus seats, Claude Pro accounts for marketing, and hospitality automation API keys).

#### 1. What are your biggest pain points when managing your team's software spend?
"In the hospitality industry, keeping operational costs low is crucial for maintaining margins. As we scale guest operations and marketing, our team started using ChatGPT Plus for guest communication, customer support automation, and custom booking templates. 

At the same time, our copywriters and marketing co-founders are expending separate Claude Pro seats ($20/mo) to draft promotional materials, seasonal campaign copy, and SEO articles. 

Because we are focused on guest satisfaction and logistics, we don't have a centralized dashboard to track who has active seats, leading to seat sprawl where we are double-paying for multiple LLM subscriptions that have identical underlying capabilities."

#### 2. How did you react to the SpendLens interface and report?
"The SpendLens results page was eye-opening. For our team size, it immediately flagged that we were running redundant Claude Pro and ChatGPT Plus subscriptions. It showed us that by consolidating to a singular ChatGPT Team plan ($25/user/month) or leveraging joint team credits, we could save **$110/month ($1,320/year)** with zero loss in copywriting and operational output. 

The fact that the tool is anonymous-first and doesn't require a bank connection was highly appealing—hospitality founders are very cautious about sharing financial credentials."

#### 3. How did this interview shape our product features?
Praveen’s insights highlighted that non-technical business founders need highly actionable, clear financial summaries to present to their co-founders. This feedback validated our decision to use **Google Gemini 2.5 Flash** to write a customized "Fractional CFO" summary at the top of the report, translating complex software seat math into a simple business case.

---

### Interview 2: Rohan M Naik (Digital Operations & Automation at Accrete Globus)
* **Profile:** Rohan M Naik is an operations and automation specialist at **Accrete Globus**, a digital services agency specializing in SEO, content automation, and web optimization.
* **Current AI Stack Monthly Spend:** ~$580/month (heavy spend on Anthropic Claude API keys, OpenAI API, and automated SEO writing platforms).

#### 1. What are your biggest pain points when managing your team's software spend?
"Our operations revolve around content generation, programmatic SEO, and workflow automation. We use various AI automation tools, utilizing Claude API keys for generating long-form SEO articles and OpenAI's API for metadata extraction and classification. 

Because we process thousands of pages daily, our monthly API billing varies wildly. Some months we get hit with massive invoices because we aren't optimizing prompt sizes, using caching, or managing token usage efficiently across our scraping and publishing pipelines. It's difficult to know if we are overpaying for raw tokens."

#### 2. How did you react to the SpendLens interface and report?
"I filled out the 3-step spend form, inputting our $580 monthly API spend and selecting the 'mixed/data' use case. The audit engine was incredibly smart. It detected our high API volumes and immediately recommended two programmatic optimizations:
1. Implementing **Anthropic Prompt Caching** (which cuts prompt input token costs by up to 90% for repeated search contexts).
2. Transitioning to **OpenAI Batch APIs** for non-time-sensitive data extraction tasks (yielding a flat 50% pricing discount).

It calculated an annual savings of **$2,640/year**. The developer-focused recommendations were highly technical and immediately actionable for our devops team."

#### 3. How did this interview shape our product features?
Rohan's interview proved that agencies running heavy programmatic automation are losing thousands of dollars because they don't understand developer-tier API pricing features (like batch runs and token caching). As a direct result, we designed **Check 3 (API Arbitrage)** inside `audit-engine.ts` to explicitly capture high API spend ranges ($500+) and output specific developer caching and batching recommendations.

---

### Interview 3: Ronik Bajakke (Associate Software Engineer at TEmpower)
* **Profile:** Ronik Bajakke is a full-stack engineer at **TEmpower**, an enterprise software solutions provider.
* **Current AI Stack Monthly Spend:** ~$160/month (paying for premium developer IDE seats and code-generation models).

#### 1. What are your biggest pain points when managing your team's software spend?
"Our dev team works extensively on enterprise Java full-stack applications. To speed up code generation, debugging, boilerplate building, and refactoring, individual devs have been expensing various tools. 

Some are on Cursor Pro ($20/mo), others are on Windsurf ($20/mo), and several use standard GitHub Copilot ($10/mo) integrated into IntelliJ IDEA. Because the company expenses these back to separate team budgets, leadership has no central visibility into the fact that we are double-paying for developer tools that do the exact same things in the IDE."

#### 2. How did you react to the SpendLens interface and report?
"The interface is incredibly premium and fast. I entered our tool seats, chose the 'coding' use case, and submitted. The engine instantly flagged that our team size of 5 had redundant seats across Cursor and Copilot. 

It recommended consolidating all Java developers to standard GitHub Copilot Pro plans ($10/mo) since our IDE environment is primarily IntelliJ, which saves us **$60/month ($720/year)** while maintaining equivalent coding intelligence and autocompletion power. The tool cards visually illustrated the cost-benefit trade-offs perfectly."

#### 3. How did this interview shape our product features?
Ronik's interview taught us that software engineering teams need highly specific tool comparisons. It's not enough to recommend the cheapest tool; the recommendation must respect their primary IDE and languages. This feedback led us to build the **Use-Case Cross-Tool Comparison Matrix** inside `audit-engine.ts`, which specifically triggers when the user selects the "coding" use case, recommending the absolute cheapest high-performance coding assistants (like Copilot at $10) over redundant IDE-wrapped tools.
