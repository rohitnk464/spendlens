import { AuditInput, AuditResult, ToolAuditResult, RecommendationType, SavingsTier } from "@/types";
import { getToolPlans, getPlanById, getToolDisplayName } from "./pricing-data";
import { generateAuditId } from "./utils";

export function runAudit(input: AuditInput): AuditResult {
  const toolsResult: ToolAuditResult[] = [];
  let totalMonthlySavings = 0;
  let totalCredexSavings = 0;

  for (const entry of input.tools) {
    const plans = getToolPlans(entry.tool);
    const currentPlanDetails = getPlanById(entry.tool, entry.planId);

    // If plan not found, skip silently — shouldn't happen with valid form data
    if (!currentPlanDetails) {
      console.warn(`Plan not found for tool: ${entry.tool}, planId: ${entry.planId}`);
      continue;
    }

    const displayName = getToolDisplayName(entry.tool);
    let recommendation: RecommendationType = "keep";
    let recommendedAction = "You are on the correct plan.";
    let recommendedPlan: string | undefined;
    let alternativeTool: string | undefined;
    let newMonthlyCost = entry.monthlySpend;
    let monthlySavings = 0;
    let reasoning = `${displayName} is already optimally configured for your team. No changes recommended.`;
    let credexSavings = 0;

    const currentCost = entry.monthlySpend;

    // Skip tools with $0 spend — free tier, nothing to optimize
    if (currentCost === 0) {
      toolsResult.push({
        tool: entry.tool,
        toolDisplayName: displayName,
        currentPlan: currentPlanDetails.name,
        currentMonthlyCost: 0,
        recommendation: "keep",
        recommendedAction: "You are on the free plan.",
        newMonthlyCost: 0,
        monthlySavings: 0,
        annualSavings: 0,
        reasoning: `${displayName} Free plan has no cost to optimize.`,
        credexSavings: 0,
      });
      continue;
    }

    // === Check 1: Right plan tier for team size? ===
    if (currentPlanDetails.isEnterprise && entry.seats < (currentPlanDetails.minRecommendedSeats || 20)) {
      recommendation = "downgrade";
      const targetPlan = plans.find((p) => p.isPerUser && !p.isEnterprise && !p.minRecommendedSeats);
      if (targetPlan) {
        recommendedPlan = targetPlan.id;
        newMonthlyCost = targetPlan.pricePerUserMonth * entry.seats;
        monthlySavings = currentCost - newMonthlyCost;
        recommendedAction = `Downgrade from ${currentPlanDetails.name} to ${targetPlan.name}`;
        reasoning = `Your team of ${entry.seats} on ${displayName} ${currentPlanDetails.name} ($${currentPlanDetails.pricePerUserMonth}/user) could use the ${targetPlan.name} plan ($${targetPlan.pricePerUserMonth}/user) and save $${Math.round(monthlySavings)}/mo — enterprise features aren't needed at this size.`;
      }
    } else if (
      currentPlanDetails.isPerUser &&
      !currentPlanDetails.isEnterprise &&
      entry.seats <= 2 &&
      currentPlanDetails.minRecommendedSeats
    ) {
      recommendation = "downgrade";
      const targetPlan = plans.find((p) => p.isPerUser && !p.minRecommendedSeats && !p.isEnterprise && p.pricePerUserMonth < currentPlanDetails.pricePerUserMonth);
      if (targetPlan) {
        recommendedPlan = targetPlan.id;
        newMonthlyCost = targetPlan.pricePerUserMonth * entry.seats;
        monthlySavings = currentCost - newMonthlyCost;
        recommendedAction = `Downgrade to ${targetPlan.name} plan`;
        reasoning = `Your team of ${entry.seats} on ${displayName} ${currentPlanDetails.name} ($${currentPlanDetails.pricePerUserMonth}/user) could use individual ${targetPlan.name} plans ($${targetPlan.pricePerUserMonth}/user) and save $${Math.round(monthlySavings)}/mo — team admin features aren't needed at this size.`;
      }
    }

    // === Check 2: API spend optimization (Batch API) ===
    if (recommendation === "keep" && currentPlanDetails.isApi && entry.monthlySpend > 100) {
      recommendation = "optimize";
      recommendedAction = "Enable Batch API & Prompt Caching";
      monthlySavings = Math.round(entry.monthlySpend * 0.4); // Conservative 40% discount estimate
      newMonthlyCost = entry.monthlySpend - monthlySavings;
      reasoning = `At $${entry.monthlySpend}/mo in ${displayName} spend, enabling Batch API (50% discount) for async workloads and Prompt Caching (up to 90% savings on repeated inputs) could save $${monthlySavings}+/mo.`;
    }

    // === Check 3: Cross-tool switch recommendations by use case ===
    if (recommendation === "keep") {
      // Cursor Pro → GitHub Copilot Pro (coding, cheaper alternative)
      if (input.useCase === "coding" && entry.tool === "cursor" && currentPlanDetails.pricePerUserMonth >= 20) {
        const copilotCost = 10 * entry.seats;
        if (copilotCost < currentCost) {
          recommendation = "switch";
          alternativeTool = "github-copilot";
          newMonthlyCost = copilotCost;
          monthlySavings = currentCost - newMonthlyCost;
          recommendedAction = "Switch to GitHub Copilot Pro";
          reasoning = `GitHub Copilot Pro ($10/user/mo) provides equivalent AI coding assistance to Cursor Pro ($${currentPlanDetails.pricePerUserMonth}/user/mo) at half the cost for your coding-focused workflow.`;
        }
      }
      // Windsurf Pro → GitHub Copilot Pro (coding, cheaper)
      else if (input.useCase === "coding" && entry.tool === "windsurf" && currentPlanDetails.pricePerUserMonth >= 20) {
        const copilotCost = 10 * entry.seats;
        if (copilotCost < currentCost) {
          recommendation = "switch";
          alternativeTool = "github-copilot";
          newMonthlyCost = copilotCost;
          monthlySavings = currentCost - newMonthlyCost;
          recommendedAction = "Switch to GitHub Copilot Pro";
          reasoning = `GitHub Copilot Pro ($10/user/mo) offers equivalent code completion to Windsurf Pro ($${currentPlanDetails.pricePerUserMonth}/user/mo), halving your IDE AI cost for the same output.`;
        }
      }
      // Claude Max 20x → Claude Pro (if team is small)
      else if (entry.tool === "claude" && currentPlanDetails.pricePerUserMonth >= 100 && entry.seats <= 2) {
        const proPlan = plans.find(p => p.id === "claude-pro");
        if (proPlan) {
          newMonthlyCost = proPlan.pricePerUserMonth;
          monthlySavings = currentCost - newMonthlyCost;
          if (monthlySavings > 0) {
            recommendation = "downgrade";
            recommendedPlan = proPlan.id;
            recommendedAction = `Downgrade to Claude Pro`;
            reasoning = `Claude Pro ($20/mo) provides ample capacity for 1-2 users. Your current ${currentPlanDetails.name} ($${currentPlanDetails.pricePerUserMonth}/mo) is over-provisioned, wasting $${Math.round(monthlySavings)}/mo.`;
          }
        }
      }
      // ChatGPT Pro (high) → ChatGPT Plus
      else if (entry.tool === "chatgpt" && currentPlanDetails.pricePerUserMonth >= 200) {
        const plusPlan = plans.find(p => p.id === "chatgpt-plus");
        if (plusPlan) {
          newMonthlyCost = plusPlan.pricePerUserMonth;
          monthlySavings = currentCost - newMonthlyCost;
          if (monthlySavings > 0) {
            recommendation = "downgrade";
            recommendedPlan = plusPlan.id;
            recommendedAction = `Downgrade from ChatGPT Pro to ChatGPT Plus`;
            reasoning = `ChatGPT Plus ($20/mo) covers 95% of use cases at 1/10th the price of ChatGPT Pro ($200/mo). Unless you rely heavily on 250 Deep Research runs/mo, the downgrade saves $${Math.round(monthlySavings)}/mo.`;
          }
        }
      }
    }

    // === Check 4: Credex credits discount (20% conservative estimate) ===
    if (currentCost > 0) {
      credexSavings = Math.round(currentCost * 0.2);
    }

    totalMonthlySavings += monthlySavings;
    totalCredexSavings += credexSavings;

    toolsResult.push({
      tool: entry.tool,
      toolDisplayName: displayName,
      currentPlan: currentPlanDetails.name,
      currentMonthlyCost: currentCost,
      recommendation,
      recommendedAction,
      recommendedPlan,
      alternativeTool,
      newMonthlyCost: Math.max(0, newMonthlyCost),
      monthlySavings: Math.max(0, monthlySavings),
      annualSavings: Math.max(0, monthlySavings) * 12,
      reasoning,
      credexSavings,
    });
  }

  const totalAnnualSavings = totalMonthlySavings * 12;

  let savingsTier: SavingsTier = "optimal";
  if (totalMonthlySavings > 500) {
    savingsTier = "high";
  } else if (totalMonthlySavings >= 100) {
    savingsTier = "medium";
  } else if (totalMonthlySavings > 0) {
    savingsTier = "low";
  }

  return {
    id: generateAuditId(),
    tools: toolsResult,
    totalMonthlySavings,
    totalAnnualSavings,
    totalCredexSavings,
    savingsTier,
    teamSize: input.teamSize,
    useCase: input.useCase,
    createdAt: new Date().toISOString(),
  };
}
