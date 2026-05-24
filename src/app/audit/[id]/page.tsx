import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase-server";
import { AuditResult } from "@/types";
import ResultsHero from "@/components/audit/ResultsHero";
import AISummary from "@/components/audit/AISummary";
import ToolBreakdown from "@/components/audit/ToolBreakdown";
import ShareButton from "@/components/audit/ShareButton";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import LeadCaptureForm from "@/components/audit/LeadCaptureForm";
import type { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const id = params.id;
  
  // Basic validation to prevent unnecessary DB queries
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    return { title: "Audit Not Found" };
  }

  const supabase = await createServerClient();
  const { data } = await supabase.from("audits").select("results").eq("id", id).single();
  
  if (!data) return { title: "Audit Not Found" };

  const results: AuditResult = typeof data.results === 'string' ? JSON.parse(data.results) : data.results;
  const savings = Math.floor(results.totalAnnualSavings).toLocaleString();

  return {
    title: `I saved $${savings} on AI tools using SpendLens!`,
    description: "Audit your SaaS stack and discover cheaper, better AI alternatives.",
    openGraph: {
      title: `I saved $${savings} on AI tools using SpendLens!`,
      description: "Audit your SaaS stack and discover cheaper, better AI alternatives.",
      url: `https://spendlens.com/audit/${id}`,
      siteName: "SpendLens",
      images: [
        {
          url: "https://spendlens.com/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `I saved $${savings} on AI tools using SpendLens!`,
      description: "Audit your SaaS stack and discover cheaper, better AI alternatives.",
      images: ["https://spendlens.com/og-image.png"],
    },
  };
}

export default async function AuditResultsPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  // UUID regex check to prevent malformed queries
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    notFound();
  }

  const supabase = await createServerClient();
  
  const { data, error } = await supabase
    .from("audits")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  // Handle both JSONB parsing and raw objects safely
  const results: AuditResult = typeof data.results === 'string' 
    ? JSON.parse(data.results) 
    : data.results;

  return (
    <main className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Top nav bar inside the page */}
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          Back to start
        </Link>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <ShareButton />
        </div>
      </div>

      <ResultsHero 
        annualSavings={results.totalAnnualSavings} 
        savingsTier={results.savingsTier} 
      />

      <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
        <AISummary auditId={id} initialSummary={data.ai_summary} />
      </div>

      <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <ToolBreakdown tools={results.tools} />
      </div>

      <div className="mt-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
        <LeadCaptureForm auditId={id} savingsTier={results.savingsTier} />
      </div>

      {/* CTA Footer for Credex */}
      {results.totalCredexSavings && results.totalCredexSavings > 0 && (
        <div className="mt-12 p-8 glass rounded-2xl border-primary/30 bg-primary/5 text-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h3 className="text-xl font-bold mb-2">Want to save an additional ${Math.floor(results.totalCredexSavings)}/mo?</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Credex provides discounted AI infrastructure credits for tools like Anthropic, OpenAI, and Gemini. Get retail access at wholesale prices.
          </p>
          <a 
            href="https://credex.rocks" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            Claim Credex Credits
          </a>
        </div>
      )}
    </main>
  );
}
