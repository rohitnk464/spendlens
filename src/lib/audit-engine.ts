import { AuditInput, AuditResult, ToolAuditResult, RecommendationType, SavingsTier } from "@/types";
import { getToolPlans, getPlanById } from "./pricing-data";
import { generateAuditId } from "./utils";

export function runAudit(input: AuditInput): AuditResult {
  const toolsResult: ToolAuditResult[] = [];
  let totalMonthlySavings = 0;
  let totalCredexSavings = 0;

  for (const entry of input.tools) {
    const plans = getToolPlans(entry.tool);
    const currentPlanDetails = getPlanById(entry.tool, entry.planId);
    
    if (!currentPlanDetails) {
      continue;
    }

    let recommendation: RecommendationType = "keep";
    let recommendedAction = "You are on the correct plan.";
    let recommendedPlan: string | undefined;
    let alternativeTool: string | undefined;
    let newMonthlyCost = entry.monthlySpend;
    let monthlySavings = 0;
    let reasoning = "You're already on the optimal plan. No changes recommended.";
    let credexSavings = 0;

    const currentCost = entry.monthlySpend;

    // Check 1: Right plan for usage?
    if (currentPlanDetails.isEnterprise && entry.seats < (currentPlanDetails.minRecommendedSeats || 20)) {
      recommendation = "downgrade";
      const targetPlan = plans.find((p) => p.isPerUser && !p.isEnterprise);
      if (targetPlan) {
        recommendedPlan = targetPlan.id;
        newMonthlyCost = targetPlan.pricePerUserMonth * entry.seats;
        monthlySavings = currentCost - newMonthlyCost;
        recommendedAction = `Downgrade to ${targetPlan.name} plan`;
        reasoning = `Your team of ${entry.seats} on ${currentPlanDetails.name} ($${currentPlanDetails.pricePerUserMonth}/user) could use ${targetPlan.name} ($${targetPlan.pricePerUserMonth}/user) and save $${monthlySavings}/mo — enterprise features aren't needed at this size.`;
      }
    } else if (currentPlanDetails.isPerUser && !currentPlanDetails.isEnterprise && entry.seats <= 2 && currentPlanDetails.minRecommendedSeats) {
        recommendation = "downgrade";
        const targetPlan = plans.find((p) => p.isPerUser && !p.minRecommendedSeats);
        if (targetPlan) {
            recommendedPlan = targetPlan.id;
            newMonthlyCost = targetPlan.pricePerUserMonth * entry.seats;
            monthlySavings = currentCost - newMonthlyCost;
            recommendedAction = `Downgrade to ${targetPlan.name} plan`;
            reasoning = `Your team of ${entry.seats} on ${currentPlanDetails.name} ($${currentPlanDetails.pricePerUserMonth}/user) could use individual ${targetPlan.name} plans ($${targetPlan.pricePerUserMonth}/user) and save $${monthlySavings}/mo — team admin features aren't needed at this size.`;
        }
    }

    // Check 2 & 3: Cheaper alternative tool / optimization for APIs
    if (recommendation === "keep") {
      if (currentPlanDetails.isApi && entry.monthlySpend > 400) {
        recommendation = "optimize";
        recommendedAction = "Enable Batch API";
        monthlySavings = entry.monthlySpend * 0.5; // Estimated 50% discount for Batch API
        newMonthlyCost = entry.monthlySpend - monthlySavings;
        reasoning = `At $${entry.monthlySpend}/mo API spend, enabling Batch API (50% discount) for non-time-sensitive workloads could save $${monthlySavings}+/mo.`;
      } else if (input.useCase === "coding" && entry.tool === "cursor" && currentPlanDetails.name.includes("Pro")) {
        // Example logic for switching tools based on use case
        recommendation = "switch";
        alternativeTool = "github-copilot";
        newMonthlyCost = 10 * entry.seats; // Copilot Pro is $10
        monthlySavings = currentCost - newMonthlyCost;
        recommendedAction = "Switch to GitHub Copilot Pro";
        reasoning = `GitHub Copilot Pro ($10/user) provides equivalent coding assistance to Cursor Pro ($20/user) at half the cost for your coding-focused workflow.`;
      }
    }

    // Check 4: Credex credits discount
    if (currentCost > 0) {
      credexSavings = currentCost * 0.2; // 20% estimated savings
    }

    totalMonthlySavings += monthlySavings;
    totalCredexSavings += credexSavings;

    toolsResult.push({
      tool: entry.tool,
      toolDisplayName: entry.tool,
      currentPlan: currentPlanDetails.name,
      currentMonthlyCost: currentCost,
      recommendation,
      recommendedAction,
      recommendedPlan,
      alternativeTool,
      newMonthlyCost,
      monthlySavings,
      annualSavings: monthlySavings * 12,
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
