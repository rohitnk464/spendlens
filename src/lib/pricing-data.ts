// ============================================================
// SpendLens — Pricing Data (Verified May 2026)
//
// IMPORTANT: Every price here is sourced from official vendor
// pricing pages. See PRICING_DATA.md for source URLs.
// ============================================================

import type { AITool, ToolPricing, PlanInfo } from "@/types";

export const PRICING_DATA: Record<AITool, ToolPricing> = {
  cursor: {
    tool: "cursor",
    displayName: "Cursor",
    emoji: "⚡",
    category: "ide",
    officialUrl: "https://cursor.com/pricing",
    lastVerified: "2026-05-20",
    plans: [
      {
        id: "cursor-hobby",
        name: "Hobby (Free)",
        pricePerUserMonth: 0,
        isPerUser: false,
        features: [
          "Limited Agent requests",
          "Limited Tab completions",
          "No credit card required",
        ],
      },
      {
        id: "cursor-pro",
        name: "Pro",
        pricePerUserMonth: 20,
        isPerUser: true,
        features: [
          "Unlimited Tab completions",
          "Unlimited Auto mode",
          "$20/mo credit pool for premium models",
        ],
      },
      {
        id: "cursor-pro-plus",
        name: "Pro+",
        pricePerUserMonth: 60,
        isPerUser: true,
        features: ["3× Pro credit pool", "All Pro features"],
      },
      {
        id: "cursor-ultra",
        name: "Ultra",
        pricePerUserMonth: 200,
        isPerUser: true,
        features: [
          "20× Pro credit allocation",
          "Priority access to new features",
        ],
      },
      {
        id: "cursor-teams",
        name: "Teams",
        pricePerUserMonth: 40,
        isPerUser: true,
        features: [
          "Everything in Pro",
          "Centralized billing",
          "Shared chats/commands/rules",
          "Admin controls",
          "SAML/OIDC SSO",
          "RBAC",
        ],
        minRecommendedSeats: 3,
      },
      {
        id: "cursor-enterprise",
        name: "Enterprise",
        pricePerUserMonth: 60,
        isPerUser: true,
        isEnterprise: true,
        features: [
          "Everything in Teams",
          "Pooled usage",
          "Invoice/PO billing",
          "SCIM",
          "Audit logs",
          "Dedicated support",
        ],
        minRecommendedSeats: 20,
      },
    ],
  },

  "github-copilot": {
    tool: "github-copilot",
    displayName: "GitHub Copilot",
    emoji: "🐙",
    category: "ide",
    officialUrl: "https://github.com/features/copilot/plans",
    lastVerified: "2026-05-20",
    plans: [
      {
        id: "copilot-free",
        name: "Free",
        pricePerUserMonth: 0,
        isPerUser: false,
        features: [
          "2,000 code completions/mo",
          "Limited AI usage",
        ],
      },
      {
        id: "copilot-pro",
        name: "Pro",
        pricePerUserMonth: 10,
        isPerUser: true,
        features: [
          "Unlimited completions",
          "$10/mo AI Credits",
        ],
      },
      {
        id: "copilot-pro-plus",
        name: "Pro+",
        pricePerUserMonth: 39,
        isPerUser: true,
        features: [
          "$39/mo AI Credits",
          "Advanced models",
          "Agent capabilities",
        ],
      },
      {
        id: "copilot-business",
        name: "Business",
        pricePerUserMonth: 19,
        isPerUser: true,
        features: [
          "Org controls",
          "IP indemnity",
          "SSO",
          "Pooled AI credits",
        ],
        minRecommendedSeats: 3,
      },
      {
        id: "copilot-enterprise",
        name: "Enterprise",
        pricePerUserMonth: 39,
        isPerUser: true,
        isEnterprise: true,
        features: [
          "All Business features",
          "Knowledge bases",
          "GitHub.com Chat",
          "Custom models",
        ],
        minRecommendedSeats: 15,
      },
    ],
  },

  claude: {
    tool: "claude",
    displayName: "Claude",
    emoji: "🧠",
    category: "assistant",
    officialUrl: "https://claude.ai/pricing",
    lastVerified: "2026-05-20",
    plans: [
      {
        id: "claude-free",
        name: "Free",
        pricePerUserMonth: 0,
        isPerUser: false,
        features: ["Basic access", "Daily usage limits"],
      },
      {
        id: "claude-pro",
        name: "Pro",
        pricePerUserMonth: 20,
        isPerUser: false,
        features: [
          "Claude Code",
          "Unlimited projects",
          "5× Free usage",
        ],
      },
      {
        id: "claude-max-5x",
        name: "Max 5×",
        pricePerUserMonth: 100,
        isPerUser: false,
        features: ["5× Pro usage", "Priority access to new features"],
      },
      {
        id: "claude-max-20x",
        name: "Max 20×",
        pricePerUserMonth: 200,
        isPerUser: false,
        features: ["20× Pro usage", "Priority access to new features"],
      },
      {
        id: "claude-team",
        name: "Team",
        pricePerUserMonth: 30,
        isPerUser: true,
        features: [
          "Central billing",
          "SSO",
          "Enterprise search",
          "Min 5 members",
        ],
        minRecommendedSeats: 5,
      },
      {
        id: "claude-enterprise",
        name: "Enterprise",
        pricePerUserMonth: 60,
        isPerUser: true,
        isEnterprise: true,
        features: [
          "Audit logs",
          "SCIM",
          "Compliance APIs",
          "HIPAA-ready",
          "500K token context",
        ],
        minRecommendedSeats: 20,
      },
    ],
  },

  chatgpt: {
    tool: "chatgpt",
    displayName: "ChatGPT",
    emoji: "🤖",
    category: "assistant",
    officialUrl: "https://openai.com/chatgpt/pricing/",
    lastVerified: "2026-05-20",
    plans: [
      {
        id: "chatgpt-free",
        name: "Free",
        pricePerUserMonth: 0,
        isPerUser: false,
        features: ["Limited GPT access", "Basic features"],
      },
      {
        id: "chatgpt-plus",
        name: "Plus",
        pricePerUserMonth: 20,
        isPerUser: false,
        features: [
          "GPT-5.5",
          "Deep Research",
          "Advanced Voice",
        ],
      },
      {
        id: "chatgpt-pro",
        name: "Pro",
        pricePerUserMonth: 200,
        isPerUser: false,
        features: [
          "20× Plus limits",
          "1M-token context",
          "250 Deep Research runs",
        ],
      },
      {
        id: "chatgpt-team",
        name: "Team",
        pricePerUserMonth: 25,
        isPerUser: true,
        features: [
          "Admin controls",
          "No training on data",
          "Higher limits",
        ],
        minRecommendedSeats: 3,
      },
      {
        id: "chatgpt-enterprise",
        name: "Enterprise",
        pricePerUserMonth: 60,
        isPerUser: true,
        isEnterprise: true,
        features: [
          "SSO/SCIM",
          "SOC 2",
          "ISO 27001",
          "Custom data retention",
        ],
        minRecommendedSeats: 20,
      },
    ],
  },

  "anthropic-api": {
    tool: "anthropic-api",
    displayName: "Anthropic API",
    emoji: "🔌",
    category: "api",
    officialUrl: "https://www.anthropic.com/pricing",
    lastVerified: "2026-05-20",
    plans: [
      {
        id: "anthropic-api-light",
        name: "Light Usage (<$100/mo)",
        pricePerUserMonth: 50,
        isPerUser: false,
        isApi: true,
        features: [
          "Pay-as-you-go",
          "Haiku: $1/$5 per 1M tokens",
          "Sonnet: $3/$15 per 1M tokens",
        ],
      },
      {
        id: "anthropic-api-medium",
        name: "Medium Usage ($100-500/mo)",
        pricePerUserMonth: 250,
        isPerUser: false,
        isApi: true,
        features: [
          "Pay-as-you-go",
          "Prompt caching (90% savings)",
          "Batch API (50% discount)",
        ],
      },
      {
        id: "anthropic-api-heavy",
        name: "Heavy Usage (>$500/mo)",
        pricePerUserMonth: 750,
        isPerUser: false,
        isApi: true,
        features: [
          "Pay-as-you-go",
          "Prompt caching",
          "Batch API",
          "Volume considerations",
        ],
      },
    ],
  },

  "openai-api": {
    tool: "openai-api",
    displayName: "OpenAI API",
    emoji: "⚙️",
    category: "api",
    officialUrl: "https://openai.com/api/pricing/",
    lastVerified: "2026-05-20",
    plans: [
      {
        id: "openai-api-light",
        name: "Light Usage (<$75/mo)",
        pricePerUserMonth: 35,
        isPerUser: false,
        isApi: true,
        features: [
          "Pay-as-you-go",
          "GPT-4.1 Nano: $0.10/$0.40 per 1M tokens",
          "GPT-4o mini: $0.15/$0.60 per 1M tokens",
        ],
      },
      {
        id: "openai-api-medium",
        name: "Medium Usage ($75-400/mo)",
        pricePerUserMonth: 200,
        isPerUser: false,
        isApi: true,
        features: [
          "Pay-as-you-go",
          "Prompt caching (50-90% savings)",
          "Batch API (50% discount)",
        ],
      },
      {
        id: "openai-api-heavy",
        name: "Heavy Usage (>$400/mo)",
        pricePerUserMonth: 600,
        isPerUser: false,
        isApi: true,
        features: [
          "Pay-as-you-go",
          "Prompt caching",
          "Batch API",
          "Volume discounts",
        ],
      },
    ],
  },

  gemini: {
    tool: "gemini",
    displayName: "Gemini",
    emoji: "✨",
    category: "assistant",
    officialUrl: "https://one.google.com/about/plans",
    lastVerified: "2026-05-20",
    plans: [
      {
        id: "gemini-free",
        name: "Free",
        pricePerUserMonth: 0,
        isPerUser: false,
        features: ["Flash & Flash-Lite models", "Basic features"],
      },
      {
        id: "gemini-pro",
        name: "AI Pro",
        pricePerUserMonth: 19.99,
        isPerUser: false,
        features: [
          "Gemini Pro model access",
          "5TB storage",
          "NotebookLM",
        ],
      },
      {
        id: "gemini-ultra",
        name: "AI Ultra",
        pricePerUserMonth: 99.99,
        isPerUser: false,
        features: [
          "5× Pro limits",
          "20TB storage",
          "Priority features",
        ],
      },
    ],
  },

  windsurf: {
    tool: "windsurf",
    displayName: "Windsurf",
    emoji: "🏄",
    category: "ide",
    officialUrl: "https://windsurf.com/pricing",
    lastVerified: "2026-05-20",
    plans: [
      {
        id: "windsurf-free",
        name: "Free",
        pricePerUserMonth: 0,
        isPerUser: false,
        features: [
          "Light usage quota",
          "Core features",
          "Unlimited Tab completions",
        ],
      },
      {
        id: "windsurf-pro",
        name: "Pro",
        pricePerUserMonth: 20,
        isPerUser: true,
        features: [
          "Increased daily/weekly quotas",
          "All premium models",
          "Unlimited Tab/Command/Previews",
        ],
      },
      {
        id: "windsurf-teams",
        name: "Teams",
        pricePerUserMonth: 40,
        isPerUser: true,
        features: [
          "Everything in Pro",
          "Centralized billing",
          "Admin dashboards",
          "Team analytics",
        ],
        minRecommendedSeats: 3,
      },
      {
        id: "windsurf-max",
        name: "Max",
        pricePerUserMonth: 200,
        isPerUser: true,
        features: [
          "Significantly higher quotas",
          "For heavy users",
        ],
      },
      {
        id: "windsurf-enterprise",
        name: "Enterprise",
        pricePerUserMonth: 60,
        isPerUser: true,
        isEnterprise: true,
        features: [
          "Custom allocations",
          "SSO",
          "RBAC",
          "SOC 2",
          "HIPAA compliance",
        ],
        minRecommendedSeats: 20,
      },
    ],
  },
};

// ============================================================
// Helper functions
// ============================================================

/** Get display name for a tool */
export function getToolDisplayName(tool: AITool): string {
  return PRICING_DATA[tool].displayName;
}

/** Get emoji for a tool */
export function getToolEmoji(tool: AITool): string {
  return PRICING_DATA[tool].emoji;
}

/** Get plans for a tool */
export function getToolPlans(tool: AITool): PlanInfo[] {
  return PRICING_DATA[tool].plans;
}

/** Get a specific plan by ID */
export function getPlanById(tool: AITool, planId: string): PlanInfo | undefined {
  return PRICING_DATA[tool].plans.find((p) => p.id === planId);
}

/** Get all supported tools */
export function getAllTools(): AITool[] {
  return Object.keys(PRICING_DATA) as AITool[];
}

/** Get tools by category */
export function getToolsByCategory(category: "ide" | "assistant" | "api"): AITool[] {
  return (Object.entries(PRICING_DATA) as [AITool, ToolPricing][])
    .filter(([, data]) => data.category === category)
    .map(([tool]) => tool);
}

/** Get the official pricing URL for a tool */
export function getToolPricingUrl(tool: AITool): string {
  return PRICING_DATA[tool].officialUrl;
}
