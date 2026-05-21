# AI Tool Pricing Data Sources

*Last Verified: May 20, 2026*

This document traces every pricing number used in the SpendLens audit engine back to an official vendor URL. This data is critical for accurate savings calculations.

## 1. Cursor
**URL:** [https://cursor.com/pricing](https://cursor.com/pricing)
- **Hobby (Free):** $0
- **Pro:** $20/user/month (Unlimited Tab completions, $20/mo credit pool for premium models)
- **Pro+:** $60/user/month (3× Pro credit pool)
- **Ultra:** $200/user/month (20× Pro credit allocation, priority access)
- **Teams:** $40/user/month (Centralized billing, shared controls, minimum 3 seats recommended)
- **Enterprise:** $60/user/month (Custom, assumed starting price for calculation logic)

## 2. GitHub Copilot
**URL:** [https://github.com/features/copilot/plans](https://github.com/features/copilot/plans)
- **Free:** $0 (2,000 code completions/mo)
- **Pro:** $10/user/month (Unlimited completions, $10/mo AI Credits)
- **Pro+:** $39/user/month ($39/mo AI Credits, advanced models)
- **Business:** $19/user/month (Org controls, IP indemnity)
- **Enterprise:** $39/user/month (Custom models, GitHub.com Chat)

## 3. Claude (Anthropic)
**URL:** [https://claude.ai/pricing](https://claude.ai/pricing)
- **Free:** $0
- **Pro:** $20/month (5× Free usage, Claude Code)
- **Max 5×:** $100/month (5× Pro usage)
- **Max 20×:** $200/month (20× Pro usage)
- **Team:** $30/user/month (Minimum 5 members, central billing)
- **Enterprise:** Custom (Estimated $60/user/month for logic)

## 4. ChatGPT (OpenAI)
**URL:** [https://openai.com/chatgpt/pricing/](https://openai.com/chatgpt/pricing/)
- **Free:** $0
- **Plus:** $20/month (Deep Research, GPT-5.5)
- **Pro:** $200/month (20× Plus limits)
- **Team:** $25/user/month
- **Enterprise:** Custom (Estimated $60/user/month for logic)

## 5. Anthropic API
**URL:** [https://www.anthropic.com/pricing](https://www.anthropic.com/pricing)
Pricing is token-based. We group usage into tiers for the audit engine:
- **Light Usage:** ~$50/mo
- **Medium Usage:** ~$250/mo (Recommends Prompt Caching / Batch API)
- **Heavy Usage:** ~$750+/mo (Strong recommendation for Batch API at 50% discount)

## 6. OpenAI API
**URL:** [https://openai.com/api/pricing/](https://openai.com/api/pricing/)
Pricing is token-based. We group usage into tiers:
- **Light Usage:** ~$35/mo
- **Medium Usage:** ~$200/mo (Recommends caching and batching)
- **Heavy Usage:** ~$600+/mo (Strong optimization recommendations)

## 7. Gemini (Google)
**URL:** [https://one.google.com/about/plans](https://one.google.com/about/plans)
- **Free:** $0 (Flash models only)
- **AI Pro:** $19.99/month (Pro model access, 5TB storage)
- **AI Ultra:** $99.99/month (5× Pro limits, 20TB storage)

## 8. Windsurf
**URL:** [https://windsurf.com/pricing](https://windsurf.com/pricing)
- **Free:** $0 (Light usage quota)
- **Pro:** $20/month (Increased daily/weekly quotas)
- **Teams:** $40/user/month (Admin dashboards, team analytics)
- **Max:** $200/month (For heavy users)
- **Enterprise:** Custom (Estimated $60/user/month for logic)

---
*Note: All prices are standard monthly billing unless noted otherwise. Annual billing often carries a 15-20% discount not factored into conservative baseline savings estimates.*
