import { NextResponse } from "next/server";
import { runAudit } from "@/lib/audit-engine";
import { AuditInput } from "@/types";
import { createServerClient } from "@/lib/supabase-server";

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

    // 3. Save to Supabase
    try {
      const supabase = await createServerClient();
      
      const { error } = await supabase.from("audits").insert({
        id: auditResult.id,
        tools: auditResult.tools,
        team_size: auditResult.teamSize,
        use_case: auditResult.useCase,
        results: auditResult,
        total_monthly_savings: auditResult.totalMonthlySavings,
        total_annual_savings: auditResult.totalAnnualSavings,
        total_credex_savings: auditResult.totalCredexSavings,
        savings_tier: auditResult.savingsTier,
        created_at: auditResult.createdAt,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        // Continue anyway - we can still return the result to the user even if DB fails
      }
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      // DB failure shouldn't block the user from seeing their results
      // (Though shareable links won't work)
    }

    // 4. Return success with the generated audit result
    return NextResponse.json({
      success: true,
      data: auditResult,
    });

  } catch (error: any) {
    console.error("Audit API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
