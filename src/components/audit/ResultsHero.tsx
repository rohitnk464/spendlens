"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingDown, CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function ResultsHero({ 
  annualSavings, 
  savingsTier 
}: { 
  annualSavings: number;
  savingsTier: 'high' | 'medium' | 'low' | 'optimal';
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (annualSavings === 0) return;
    
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += annualSavings / steps;
      if (current >= annualSavings) {
        clearInterval(timer);
        setDisplayValue(annualSavings);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [annualSavings]);

  const getTierMessage = () => {
    switch (savingsTier) {
      case 'high': return "Major optimization opportunity detected.";
      case 'medium': return "Solid savings found by right-sizing.";
      case 'low': return "A few minor tweaks can save you money.";
      case 'optimal': return "Your stack is perfectly optimized!";
    }
  };

  return (
    <div className="relative overflow-hidden glass rounded-3xl p-8 sm:p-12 mb-8 text-center animate-slide-up border-primary/20 glow">
      <div className="absolute inset-0 radial-gradient opacity-50" />
      
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6"
        >
          {savingsTier === 'optimal' ? (
            <><CheckCircle2 className="w-4 h-4" /> Perfect Score</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Audit Complete</>
          )}
        </motion.div>

        <h1 className="text-xl sm:text-2xl text-muted-foreground font-medium mb-2">
          Projected Annual Savings
        </h1>
        
        <div className="text-6xl sm:text-8xl font-bold tracking-tighter gradient-text mb-6">
          {formatCurrency(displayValue)}
        </div>
        
        <p className="text-lg sm:text-xl text-foreground font-medium flex items-center justify-center gap-2">
          {savingsTier !== 'optimal' && <TrendingDown className="w-5 h-5 text-green-500" />}
          {getTierMessage()}
        </p>
      </div>
    </div>
  );
}
