"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export default function LeadCaptureForm({ auditId, savingsTier }: { auditId: string, savingsTier: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  
  // Honeypot field for basic bot protection
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    // Honeypot check - bots will often fill this hidden field
    if (website) {
      console.log("Bot detected");
      return;
    }
    
    setStatus("loading");
    
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, auditId, savingsTier }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatus("success");
        setMessage("Check your inbox! We've sent your detailed report.");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to send email. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("A network error occurred. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 rounded-2xl glass border border-green-500/30 bg-green-500/5 text-center transition-all animate-fade-in">
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Report Sent Successfully</h3>
        <p className="text-muted-foreground">{message}</p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-border/50 bg-secondary/10 text-center transition-all">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/20">
        <Mail className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">Save & Share Your Report</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Get a copy of this exact breakdown sent to your inbox, and stay updated when we find new ways to cut your AI spend.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
        {/* Honeypot field - visually hidden but available to screen readers/bots */}
        <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input 
            type="text" 
            id="website" 
            name="website" 
            tabIndex={-1} 
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            autoComplete="off"
          />
        </div>
        
        <div className="flex-1">
          <input
            type="email"
            placeholder="Enter your work email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            disabled={status === "loading"}
          />
        </div>
        <Button 
          type="submit" 
          disabled={status === "loading"}
          className="h-12 px-6 rounded-xl w-full sm:w-auto"
        >
          {status === "loading" ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
          ) : (
            <>Email My Report <ArrowRight className="w-4 h-4 ml-2" /></>
          )}
        </Button>
      </form>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-500">{message}</p>
      )}
    </div>
  );
}
