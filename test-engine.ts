import { runAudit } from "./src/lib/audit-engine";
import { AuditInput } from "./src/types";

const input: AuditInput = {
  tools: [
    { tool: "chatgpt", planId: "chatgpt-enterprise", monthlySpend: 602222, seats: 1 },
    { tool: "anthropic-api", planId: "anthropic-api-heavy", monthlySpend: 750, seats: 1 }
  ],
  teamSize: 1,
  useCase: "mixed"
};

const result = runAudit(input);
console.log(JSON.stringify(result, null, 2));
