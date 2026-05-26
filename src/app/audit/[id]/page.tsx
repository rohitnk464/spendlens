import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { AuditResult } from "@/types";
import ResultsHero from "@/components/audit/ResultsHero";
import AISummary from "@/components/audit/AISummary";
import ToolBreakdown from "@/components/audit/ToolBreakdown";
import ShareButton from "@/components/audit/ShareButton";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import LeadCaptureForm from "@/components/audit/LeadCaptureForm";
import type { Metadata } from "next";

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const id = params.id;
  
  // Basic validation - nanoid(12) format, alphanumeric + _ -
  const validIdRegex = /^[a-zA-Z0-9_-]{8,20}$/;
  if (!validIdRegex.test(id)) {
    return { title: "Audit Not Found" };
  }

  const { data } = await supabaseAdmin.from("audits").select("results").eq("id", id).single();
  
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

  // Basic validation - nanoid(12) format, alphanumeric + _ -
  const validIdRegex = /^[a-zA-Z0-9_-]{8,20}$/;
  if (!validIdRegex.test(id)) {
    notFound();
  }

  const { data, error } = await supabaseAdmin
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

      {/* CTA Footer for Credex — always shown */}
      <div className="mt-12 p-8 glass rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 text-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">💡</span>
        </div>
        <h3 className="text-xl font-bold mb-2">
          {results.totalCredexSavings > 0
            ? `Save an additional $${Math.floor(results.totalCredexSavings)}/mo with Credex`
            : "Maximize Your Savings with Credex Credits"}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          Credex provides discounted AI infrastructure credits for tools like Anthropic API, OpenAI API, Cursor, Claude Pro, and more — at wholesale prices. Purchase credit pools and cut your AI bills by an additional 15–30%.
        </p>
        <a
          href="https://credex.rocks"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0"
        >
          Claim Credex Credits
          <span>→</span>
        </a>
        <p className="mt-4 text-xs text-muted-foreground">Used by 500+ startups to cut AI infrastructure costs</p>
      </div>
    </main>
  );
}

