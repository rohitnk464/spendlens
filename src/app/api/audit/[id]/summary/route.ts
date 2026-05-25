import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // 1. Fetch audit data
    const { data: audit, error: fetchError } = await supabaseAdmin
      .from("audits")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !audit) {
      return NextResponse.json({ success: false, error: "Audit not found" }, { status: 404 });
    }

    // 2. If it already has a summary, just return it
    if (audit.ai_summary) {
      return NextResponse.json({ success: true, summary: audit.ai_summary });
    }

    // 3. Prepare the prompt based on PROMPTS.md
    const { team_size, use_case, results } = audit;
    
    // Safety check in case results isn't properly typed from JSONB
    const auditData = typeof results === 'string' ? JSON.parse(results) : results;
    
    const toolFindings = auditData.tools.map((t: unknown) => {
      const tool = t as { tool: string, currentMonthlyCost: number, recommendation: string, recommendedAction: string };
      return `- ${tool.tool}: Currently paying $${tool.currentMonthlyCost}/mo. Recommendation: ${tool.recommendation}. ${tool.recommendedAction}`;
    }).join("\n");

    const prompt = `You are an expert SaaS financial auditor and AI tool specialist.

A team has just used SpendLens to audit their AI software subscriptions.
Here is the deterministic data from our audit engine:
- Team Size: ${team_size}
- Primary Use Case: ${use_case}
- Total Annual Savings Found: $${auditData.totalAnnualSavings}
- Savings Tier: ${auditData.savingsTier}

Tool-specific findings:
${toolFindings}

Based on this data, write ONE short, punchy, and highly personalized summary paragraph (max 4-5 sentences).

Rules:
1. Speak directly to the user (e.g., "As a team of 4 focused on software engineering...").
2. Mention the total annual savings prominently.
3. Highlight the most impactful change they can make (e.g., downgrading Cursor, switching to an API, etc.).
4. Keep the tone professional, objective, and encouraging (like a smart CFO).
5. Do NOT hallucinate prices or numbers — strictly use the data provided above.
6. Return ONLY the paragraph text. Do not include markdown formatting, greetings, or sign-offs.`;

    // 4. Call Gemini API
    let summaryText = "";
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("Missing GEMINI_API_KEY");
      }
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      
      summaryText = response.text || "Based on our analysis, we recommend reviewing your subscriptions.";
    } catch (aiError) {
      console.error("Gemini API Error:", aiError);
      // Fallback template summary if API fails
      summaryText = `Based on your team of ${team_size} using AI primarily for ${use_case}, our engine found $${auditData.totalAnnualSavings} in potential annual savings. By right-sizing your plans and eliminating overlaps, you can optimize your SaaS budget while maintaining full capability.`;
    }

    // 5. Save the summary back to Supabase
    try {
      await supabaseAdmin
        .from("audits")
        .update({ ai_summary: summaryText })
        .eq("id", id);
    } catch (dbError) {
      console.error("Error saving summary to DB:", dbError);
    }

    return NextResponse.json({ success: true, summary: summaryText });
  } catch (error: unknown) {
    console.error("Summary Generation Error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
