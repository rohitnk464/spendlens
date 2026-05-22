"use client";

import { useState, useEffect } from "react";
import { Sparkles, Bot, AlertTriangle } from "lucide-react";

export default function AISummary({ 
  auditId, 
  initialSummary 
}: { 
  auditId: string;
  initialSummary?: string | null;
}) {
  const [summary, setSummary] = useState<string | null>(initialSummary || null);
  const [isLoading, setIsLoading] = useState(!initialSummary);
  const [error, setError] = useState(false);

  useEffect(() => {
    // If we already have the summary from the DB, don't generate again
    if (initialSummary) return;

    const generateSummary = async () => {
      try {
        const res = await fetch(`/api/audit/${auditId}/summary`, {
          method: "POST",
        });
        const data = await res.json();
        
        if (data.success && data.summary) {
          setSummary(data.summary);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch AI summary:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    generateSummary();
  }, [auditId, initialSummary]);

  return (
    <div className="relative glass rounded-2xl p-6 sm:p-8 mb-8 border border-primary/20 overflow-hidden group">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-20 -mt-20 transition-all duration-500 group-hover:bg-primary/10" />
      
      <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-inner">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            AI Advisory Summary
            {isLoading && <Sparkles className="w-4 h-4 text-primary animate-pulse" />}
          </h3>
          
          {isLoading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-4 bg-secondary/50 rounded w-full" />
              <div className="h-4 bg-secondary/50 rounded w-11/12" />
              <div className="h-4 bg-secondary/50 rounded w-4/5" />
            </div>
          ) : error && !summary ? (
            <div className="flex items-center gap-2 text-amber-500 text-sm">
              <AlertTriangle className="w-4 h-4" />
              Failed to generate AI summary. Try refreshing the page.
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              {summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
