// ============================================================
// SpendLens — Type Definitions
// ============================================================

/** Supported AI tools */
export type AITool =
  | "cursor"
  | "github-copilot"
  | "claude"
  | "chatgpt"
  | "anthropic-api"
  | "openai-api"
  | "gemini"
  | "windsurf";

/** Primary use case for AI tools */
export type UseCase = "coding" | "writing" | "data" | "research" | "mixed";

/** Recommendation action types */
export type RecommendationType = "keep" | "downgrade" | "switch" | "optimize";

/** Savings tier based on total monthly savings */
export type SavingsTier = "high" | "medium" | "low" | "optimal";

/** Plan information for a specific tool */
export interface PlanInfo {
  id: string;
  name: string;
  pricePerUserMonth: number;
  isPerUser: boolean;
  features: string[];
  maxRecommendedSeats?: number;
  minRecommendedSeats?: number;
  isEnterprise?: boolean;
  isApi?: boolean;
}

/** Full pricing data for a tool */
export interface ToolPricing {
  tool: AITool;
  displayName: string;
  emoji: string;
  plans: PlanInfo[];
  officialUrl: string;
  lastVerified: string;
  category: "ide" | "assistant" | "api";
}

/** User's entry for a single tool */
export interface UserToolEntry {
  tool: AITool;
  planId: string;
  monthlySpend: number;
  seats: number;
}

/** Complete audit input from the user */
export interface AuditInput {
  tools: UserToolEntry[];
  teamSize: number;
  useCase: UseCase;
}

/** Audit result for a single tool */
export interface ToolAuditResult {
  tool: AITool;
  toolDisplayName: string;
  currentPlan: string;
  currentMonthlyCost: number;
  recommendation: RecommendationType;
  recommendedAction: string;
  recommendedPlan?: string;
  alternativeTool?: string;
  newMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
  reasoning: string;
  credexSavings?: number;
}

/** Complete audit result */
export interface AuditResult {
  id: string;
  tools: ToolAuditResult[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  totalCredexSavings: number;
  savingsTier: SavingsTier;
  teamSize: number;
  useCase: UseCase;
  aiSummary?: string;
  createdAt: string;
}

/** Lead capture data */
export interface LeadData {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  auditId: string;
  savingsTier: SavingsTier;
}

/** Form state for localStorage persistence */
export interface FormState {
  tools: UserToolEntry[];
  teamSize: number;
  useCase: UseCase;
  currentStep: number;
}

/** API response types */
export interface AuditApiResponse {
  success: boolean;
  data?: AuditResult;
  error?: string;
}

export interface LeadApiResponse {
  success: boolean;
  error?: string;
}

export interface SummaryApiResponse {
  success: boolean;
  summary?: string;
  error?: string;
}
