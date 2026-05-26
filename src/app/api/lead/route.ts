import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Resend } from "resend";
import { AuditResult } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

// Basic in-memory rate limiting (Note: In production with multiple instances/edge functions, 
// this should be moved to Redis (Upstash) or a Supabase table. For this hackathon MVP, this is sufficient).
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const userLimit = rateLimit.get(ip);
    
    if (userLimit && now - userLimit.timestamp < RATE_LIMIT_WINDOW) {
      if (userLimit.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { success: false, error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
      userLimit.count += 1;
    } else {
      rateLimit.set(ip, { count: 1, timestamp: now });
    }

    // 2. Parse request
    const body = await req.json();
    const { email, auditId, savingsTier } = body;

    if (!email || !auditId) {
      return NextResponse.json(
        { success: false, error: "Email and Audit ID are required" },
        { status: 400 }
      );
    }

    // 3. Save lead to Supabase
    // We don't block the email if this fails, but we log it
    try {
      await supabaseAdmin.from("leads").insert({
        email,
        audit_id: auditId,
        savings_tier: savingsTier || 'unknown',
      });
    } catch (dbError) {
      console.error("Failed to save lead to database:", dbError);
    }

    // 4. Fetch full audit data to include in the email
    let auditResults: AuditResult | null = null;
    try {
      const { data: auditData } = await supabaseAdmin
        .from("audits")
        .select("results")
        .eq("id", auditId)
        .single();
      if (auditData?.results) {
        auditResults = typeof auditData.results === "string"
          ? JSON.parse(auditData.results)
          : auditData.results;
      }
    } catch (fetchError) {
      console.error("Failed to fetch audit for email:", fetchError);
    }

    // 5. Send Transactional Email using Resend
    if (process.env.RESEND_API_KEY) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://spendlens-five-lemon.vercel.app";
      const reportUrl = `${appUrl}/audit/${auditId}`;

      // Build tool rows if we have audit data
      const annualSavings = auditResults ? Math.floor(auditResults.totalAnnualSavings).toLocaleString() : "—";
      const monthlySavings = auditResults ? Math.floor(auditResults.totalMonthlySavings).toLocaleString() : "—";
      const credexSavings = auditResults?.totalCredexSavings && auditResults.totalCredexSavings > 0
        ? Math.floor(auditResults.totalCredexSavings).toLocaleString()
        : null;

      const toolRows = auditResults?.tools
        .filter((t) => t.recommendation !== "keep")
        .map((t) => {
          const actionMap: Record<string, string> = {
            downgrade: "⬇️ Downgrade Plan",
            switch: "🔀 Switch Tool",
            optimize: "⚡ Optimize Usage",
          };
          const action = actionMap[t.recommendation] || t.recommendation;
          const saving = `$${Math.floor(t.monthlySavings)}/mo`;
          return `
            <tr style="border-bottom: 1px solid #f0f0f0;">
              <td style="padding: 10px 8px; font-weight: 600; color: #111;">${t.toolDisplayName}</td>
              <td style="padding: 10px 8px; color: #666;">${action}</td>
              <td style="padding: 10px 8px; color: #16a34a; font-weight: 700; text-align: right;">${saving}</td>
            </tr>`;
        })
        .join("") || "";

      const toolTable = toolRows
        ? `
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <thead>
            <tr style="background: #f8f8f8;">
              <th style="padding: 10px 8px; text-align: left; color: #666; font-weight: 600;">Tool</th>
              <th style="padding: 10px 8px; text-align: left; color: #666; font-weight: 600;">Action</th>
              <th style="padding: 10px 8px; text-align: right; color: #666; font-weight: 600;">Savings</th>
            </tr>
          </thead>
          <tbody>${toolRows}</tbody>
        </table>`
        : "";

      const credexSection = credexSavings
        ? `
        <div style="margin: 24px 0; padding: 16px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 10px;">
          <p style="margin: 0 0 8px; font-weight: 700; color: #1d4ed8; font-size: 15px;">💡 Extra Savings via Credex Credits</p>
          <p style="margin: 0 0 12px; color: #374151; font-size: 14px;">
            Unlock an additional <strong>$${credexSavings}/mo</strong> by purchasing discounted AI infrastructure credits
            through Credex for tools like Anthropic API, OpenAI API, and more.
          </p>
          <a href="https://credex.rocks" style="display: inline-block; background: #2563eb; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Claim Credex Credits →</a>
        </div>`
        : "";

      try {
        await resend.emails.send({
          from: "SpendLens <onboarding@resend.dev>",
          to: [email],
          subject: `Your SpendLens Audit — You can save $${annualSavings}/year on AI tools`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #ffffff;">
              
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 12px; padding: 12px 20px; margin-bottom: 16px;">
                  <span style="color: white; font-weight: 800; font-size: 20px; letter-spacing: -0.5px;">👁 SpendLens</span>
                </div>
                <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #111; line-height: 1.2;">Your AI Spend Audit Report</h1>
                <p style="color: #666; margin: 8px 0 0; font-size: 15px;">Here's exactly where you're overspending — and how to fix it.</p>
              </div>

              <!-- Savings summary box -->
              <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1px solid #86efac; border-radius: 14px; padding: 24px; text-align: center; margin-bottom: 28px;">
                <p style="margin: 0 0 4px; color: #16a34a; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Projected Annual Savings</p>
                <p style="margin: 0; font-size: 52px; font-weight: 900; color: #15803d; line-height: 1.1;">$${annualSavings}</p>
                <p style="margin: 6px 0 0; color: #166534; font-size: 15px; font-weight: 500;">= $${monthlySavings}/month reclaimed</p>
              </div>

              <!-- Tool breakdown -->
              ${toolTable ? `
              <div style="margin-bottom: 24px;">
                <h2 style="font-size: 17px; font-weight: 700; color: #111; margin: 0 0 4px;">📋 Recommended Changes</h2>
                <p style="font-size: 13px; color: #666; margin: 0 0 12px;">Apply these actions to achieve your projected savings.</p>
                ${toolTable}
              </div>` : ""}

              <!-- Credex upsell -->
              ${credexSection}

              <!-- CTA button -->
              <div style="text-align: center; margin: 32px 0 24px;">
                <a href="${reportUrl}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 14px 32px; text-decoration: none; border-radius: 50px; font-weight: 700; font-size: 16px; letter-spacing: -0.3px;">
                  View Full Interactive Report →
                </a>
              </div>

              <!-- Footer -->
              <div style="border-top: 1px solid #f0f0f0; padding-top: 20px; text-align: center;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  Powered by <a href="https://credex.rocks" style="color: #3b82f6; text-decoration: none;">Credex</a> · 
                  <a href="${reportUrl}" style="color: #3b82f6; text-decoration: none;">View Report</a>
                </p>
              </div>

            </div>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send email via Resend:", emailError);
        return NextResponse.json(
          { success: false, error: "Failed to send email" },
          { status: 500 }
        );
      }
    } else {
      console.warn("No RESEND_API_KEY found, skipping email send.");
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Lead API Error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
