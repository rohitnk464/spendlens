import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase-server";
import { AuditResult } from "@/types";
import ResultsHero from "@/components/audit/ResultsHero";
import AISummary from "@/components/audit/AISummary";
import ToolBreakdown from "@/components/audit/ToolBreakdown";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";

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
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to start
        </Link>
        
        <button className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors">
          <Share2 className="w-4 h-4 mr-2" />
          Share Report
        </button>
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
