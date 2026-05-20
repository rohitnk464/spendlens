import { expect, test, describe } from "vitest";
import { runAudit } from "@/lib/audit-engine";
import { AuditInput } from "@/types";

describe("Audit Engine", () => {
  test("1. Solo developer on Cursor Teams → recommends downgrade to Pro", () => {
    const input: AuditInput = {
      teamSize: 1,
      useCase: "coding",
      tools: [
        {
          tool: "cursor",
          planId: "cursor-teams",
          monthlySpend: 40,
          seats: 1,
        },
      ],
    };

    const result = runAudit(input);
    const toolResult = result.tools[0];

    expect(toolResult.recommendation).toBe("downgrade");
    expect(toolResult.recommendedPlan).toBe("cursor-pro");
    expect(toolResult.monthlySavings).toBe(20);
    expect(toolResult.reasoning).toContain("team admin features aren't needed at this size");
  });

  test("2. Team of 3 on ChatGPT Enterprise → recommends Team plan", () => {
    const input: AuditInput = {
      teamSize: 3,
      useCase: "mixed",
      tools: [
        {
          tool: "chatgpt",
          planId: "chatgpt-enterprise",
          monthlySpend: 180, // 60 * 3
          seats: 3,
        },
      ],
    };

    const result = runAudit(input);
    const toolResult = result.tools[0];

    expect(toolResult.recommendation).toBe("downgrade");
    expect(toolResult.recommendedPlan).toBe("chatgpt-team");
    expect(toolResult.monthlySavings).toBe(105); // 180 - (25 * 3) = 180 - 75 = 105
  });

  test("3. Already optimal setup → returns $0 savings", () => {
    const input: AuditInput = {
      teamSize: 1,
      useCase: "coding",
      tools: [
        {
          tool: "github-copilot",
          planId: "copilot-pro",
          monthlySpend: 10,
          seats: 1,
        },
      ],
    };

    const result = runAudit(input);
    const toolResult = result.tools[0];

    expect(toolResult.recommendation).toBe("keep");
    expect(toolResult.monthlySavings).toBe(0);
    expect(toolResult.reasoning).toContain("optimal plan");
  });

  test("4. Coding use case suggests cheaper alternative (Copilot vs Cursor)", () => {
    const input: AuditInput = {
      teamSize: 1,
      useCase: "coding",
      tools: [
        {
          tool: "cursor",
          planId: "cursor-pro",
          monthlySpend: 20,
          seats: 1,
        },
      ],
    };

    const result = runAudit(input);
    const toolResult = result.tools[0];

    expect(toolResult.recommendation).toBe("switch");
    expect(toolResult.alternativeTool).toBe("github-copilot");
    expect(toolResult.monthlySavings).toBe(10);
  });

  test("5. High API spend → suggests batch API optimization", () => {
    const input: AuditInput = {
      teamSize: 5,
      useCase: "data",
      tools: [
        {
          tool: "anthropic-api",
          planId: "anthropic-api-heavy",
          monthlySpend: 800,
          seats: 1,
        },
      ],
    };

    const result = runAudit(input);
    const toolResult = result.tools[0];

    expect(toolResult.recommendation).toBe("optimize");
    expect(toolResult.monthlySavings).toBe(400);
    expect(toolResult.reasoning).toContain("Batch API");
  });

  test("6. Multiple tools → total savings calculated correctly", () => {
    const input: AuditInput = {
      teamSize: 1,
      useCase: "coding",
      tools: [
        {
          tool: "cursor",
          planId: "cursor-teams", // saves $20
          monthlySpend: 40,
          seats: 1,
        },
        {
          tool: "anthropic-api",
          planId: "anthropic-api-heavy", // saves $400
          monthlySpend: 800,
          seats: 1,
        },
      ],
    };

    const result = runAudit(input);

    expect(result.totalMonthlySavings).toBe(420);
    expect(result.totalAnnualSavings).toBe(420 * 12);
  });

  test("7. Savings tier classification works", () => {
    const highInput: AuditInput = {
      teamSize: 1,
      useCase: "data",
      tools: [
        {
          tool: "anthropic-api",
          planId: "anthropic-api-heavy",
          monthlySpend: 1500, // saves $750
          seats: 1,
        },
      ],
    };
    expect(runAudit(highInput).savingsTier).toBe("high");

    const medInput: AuditInput = {
      teamSize: 3,
      useCase: "mixed",
      tools: [
        {
          tool: "chatgpt",
          planId: "chatgpt-enterprise",
          monthlySpend: 180, // saves $105
          seats: 3,
        },
      ],
    };
    expect(runAudit(medInput).savingsTier).toBe("medium");
  });
});
