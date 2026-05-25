import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { Resend } from "resend";

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

    // 4. Send Transactional Email using Resend
    if (process.env.RESEND_API_KEY) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://spendlens.com";
      const reportUrl = `${appUrl}/audit/${auditId}`;
      
      try {
        await resend.emails.send({
          from: "SpendLens <onboarding@resend.dev>",
          to: [email],
          subject: "Your SpendLens AI Audit Report",
          html: `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
              <h2 style="color: #111;">Your AI Spend Audit is ready.</h2>
              <p style="color: #444; font-size: 16px; line-height: 1.5;">
                Thanks for using SpendLens to analyze your AI subscriptions. We've compiled your deterministic savings breakdown, along with personalized recommendations from our AI engine.
              </p>
              <div style="margin: 30px 0; text-align: center;">
                <a href="${reportUrl}" style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  View Your Full Report
                </a>
              </div>
              <p style="color: #666; font-size: 14px; border-top: 1px solid #eaeaea; padding-top: 20px;">
                Want to save even more? Check out <a href="https://credex.rocks" style="color: #3b82f6;">Credex</a> to get discounted credits for API providers like Anthropic and OpenAI.
              </p>
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
