import { NextResponse } from "next/server";
import { runAudit } from "@/lib/audit-engine";
import { AuditInput } from "@/types";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const input: AuditInput = await req.json();

    // 1. Basic validation
    if (!input || !input.tools || input.tools.length === 0) {
      return NextResponse.json(
        { success: false, error: "No tools provided for audit." },
        { status: 400 }
      );
    }

    // 2. Run the deterministic audit engine
    const auditResult = runAudit(input);

    // 3. Save to Supabase — REQUIRED: results page fetches from DB, so failure = 404
    const { error: dbError } = await supabaseAdmin.from("audits").insert({
      id: auditResult.id,
      tools: auditResult.tools,
      team_size: Math.min(auditResult.teamSize, 2000000000), // Clamp to prevent INT overflow
      use_case: auditResult.useCase,
      results: auditResult,
      total_monthly_savings: Math.min(auditResult.totalMonthlySavings, 99999999.99), // Clamp to NUMERIC(10,2) max
      total_annual_savings: Math.min(auditResult.totalAnnualSavings, 99999999.99), // Clamp to NUMERIC(10,2) max
      total_credex_savings: Math.min(auditResult.totalCredexSavings, 99999999.99), // Clamp to NUMERIC(10,2) max
      savings_tier: auditResult.savingsTier,
      created_at: auditResult.createdAt,
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { success: false, error: `Database error: ${dbError.message}. Please try again.` },
        { status: 500 }
      );
    }

    // 4. Return success with the generated audit result
    return NextResponse.json({
      success: true,
      data: auditResult,
    });

  } catch (error: unknown) {
    console.error("Audit API Error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
