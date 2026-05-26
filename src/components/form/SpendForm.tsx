"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AITool, FormState, UserToolEntry, UseCase } from "@/types";
import { getAllTools, getToolDisplayName, getToolEmoji, getToolPlans } from "@/lib/pricing-data";
import { CheckCircle2, ChevronRight, ArrowLeft, Loader2 } from "lucide-react";

export default function SpendForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [state, setState] = useState<FormState>({
    tools: [],
    teamSize: 1,
    useCase: "mixed",
    currentStep: 1,
  });

  // Load from localStorage on mount
  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
    const saved = localStorage.getItem("spendlens_form");
    if (saved) {
      try {
        setState(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved form state", e);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("spendlens_form", JSON.stringify(state));
    }
  }, [state, mounted]);

  const updateState = (updates: Partial<FormState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (state.currentStep === 1 && state.tools.length === 0) return;
    updateState({ currentStep: state.currentStep + 1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    updateState({ currentStep: state.currentStep - 1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tools: state.tools,
          teamSize: state.teamSize,
          useCase: state.useCase,
        }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        // Clear local storage after successful submission
        localStorage.removeItem("spendlens_form");
        router.push(`/audit/${result.data.id}`);
      } else {
        setSubmitError(result.error || "Failed to generate audit. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting audit:", error);
      setSubmitError("Failed to connect to the server. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs sm:text-sm font-semibold tracking-wider uppercase text-muted-foreground mb-3 px-2">
          <span className={state.currentStep >= 1 ? "text-primary transition-colors duration-300" : "transition-colors duration-300"}>Select Tools</span>
          <span className={state.currentStep >= 2 ? "text-primary transition-colors duration-300" : "transition-colors duration-300"}>Configure Plans</span>
          <span className={state.currentStep >= 3 ? "text-primary transition-colors duration-300" : "transition-colors duration-300"}>Team Details</span>
        </div>
        <div className="h-1.5 w-full bg-secondary/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"
            style={{ width: `${((state.currentStep) / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="animate-fade-in">
        {state.currentStep === 1 && (
          <Step1Tools state={state} updateState={updateState} onNext={handleNext} />
        )}
        {state.currentStep === 2 && (
          <Step2Plans state={state} updateState={updateState} onNext={handleNext} onBack={handleBack} />
        )}
        {state.currentStep === 3 && (
          <Step3Team
            state={state}
            updateState={updateState}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}
      </div>
    </div>
  );
}

// ==========================================
// STEP 1: Select Tools
// ==========================================
function Step1Tools({ state, updateState, onNext }: { state: FormState; updateState: (updates: Partial<FormState>) => void; onNext: () => void }) {
  const allTools = getAllTools();
  
  const toggleTool = (toolId: AITool) => {
    const isSelected = state.tools.some((t: UserToolEntry) => t.tool === toolId);
    
    if (isSelected) {
      updateState({
        tools: state.tools.filter((t: UserToolEntry) => t.tool !== toolId)
      });
    } else {
      // Add with defaults — use first PAID plan (index 1), or first plan if only free exists
      const plans = getToolPlans(toolId);
      const defaultPlan = plans.find(p => p.pricePerUserMonth > 0) || plans[0];
      const defaultPlanId = defaultPlan?.id || "";
      const defaultSeats = 1;
      const defaultSpend = defaultPlan?.isPerUser
        ? (defaultPlan.pricePerUserMonth * defaultSeats)
        : (defaultPlan?.pricePerUserMonth || 0);

      updateState({
        tools: [
          ...state.tools,
          { tool: toolId, planId: defaultPlanId, monthlySpend: defaultSpend, seats: defaultSeats }
        ]
      });
    }
  };

  return (
    <Card className="animate-slide-up glass border-primary/10 hover:border-primary/30 transition-all duration-500 shadow-2xl">
      <CardHeader className="text-center pb-8 pt-10">
        <CardTitle className="text-3xl font-bold tracking-tight">What AI tools are you paying for?</CardTitle>
        <CardDescription className="text-base mt-2">Select all the tools your team currently uses.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {allTools.map((tool) => {
            const isSelected = state.tools.some((t: UserToolEntry) => t.tool === tool);
            return (
              <button
                key={tool}
                onClick={() => toggleTool(tool)}
                className={`relative flex items-center p-4 rounded-xl border text-left transition-all ${
                  isSelected 
                    ? "border-primary bg-primary/10 ring-1 ring-primary" 
                    : "border-border/50 bg-secondary/20 hover:bg-secondary/40 hover:border-border"
                }`}
              >
                <div className="text-2xl mr-3">{getToolEmoji(tool)}</div>
                <div className="font-medium">{getToolDisplayName(tool)}</div>
                {isSelected && (
                  <CheckCircle2 className="absolute right-4 w-5 h-5 text-primary" />
                )}
              </button>
            );
          })}
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={onNext} 
            disabled={state.tools.length === 0}
            className="w-full sm:w-auto"
          >
            Next Step <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ==========================================
// STEP 2: Configure Plans
// ==========================================
function Step2Plans({ state, updateState, onNext, onBack }: { state: FormState; updateState: (updates: Partial<FormState>) => void; onNext: () => void; onBack: () => void }) {
  const updateTool = (index: number, updates: Partial<UserToolEntry>) => {
    const newTools = [...state.tools];
    newTools[index] = { ...newTools[index], ...updates };
    
    // Auto-update monthly spend if changing plan and spend is 0 or default
    if (updates.planId || updates.seats) {
      const planId = updates.planId || newTools[index].planId;
      const toolPlans = getToolPlans(newTools[index].tool);
      const selectedPlan = toolPlans.find(p => p.id === planId);
      
      if (selectedPlan) {
        const seats = updates.seats || newTools[index].seats;
        const newSpend = selectedPlan.isPerUser 
          ? selectedPlan.pricePerUserMonth * seats 
          : selectedPlan.pricePerUserMonth;
        
        newTools[index].monthlySpend = newSpend;
      }
    }
    
    updateState({ tools: newTools });
  };

  return (
    <Card className="animate-slide-up glass border-primary/10 hover:border-primary/30 transition-all duration-500 shadow-2xl">
      <CardHeader className="text-center pb-8 pt-10">
        <CardTitle className="text-3xl font-bold tracking-tight">Configure your subscriptions</CardTitle>
        <CardDescription className="text-base mt-2">Tell us which plans you&apos;re on and your approximate monthly spend.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mb-8">
          {state.tools.map((entry: UserToolEntry, index: number) => {
            const toolPlans = getToolPlans(entry.tool);
            const isApi = toolPlans.some(p => p.isApi);
            
            return (
              <div key={entry.tool} className="p-5 rounded-xl border border-border/50 bg-secondary/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{getToolEmoji(entry.tool)}</span>
                  <h3 className="font-semibold text-lg">{getToolDisplayName(entry.tool)}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Plan Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Plan</label>
                    <select
                      value={entry.planId}
                      onChange={(e) => updateTool(index, { planId: e.target.value })}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      {toolPlans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} {plan.isApi ? '' : `($${plan.pricePerUserMonth})`}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Seats Selection (hidden for API) */}
                  {!isApi && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Seats / Users</label>
                      <input
                        type="number"
                        min="1"
                        max="1000000"
                        value={entry.seats}
                        onChange={(e) => updateTool(index, { seats: Math.min(parseInt(e.target.value) || 1, 1000000) })}
                        className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Monthly Spend */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Monthly Spend ($)</label>
                    <input
                      type="number"
                      min="0"
                      max="10000000"
                      value={entry.monthlySpend}
                      onChange={(e) => updateTool(index, { monthlySpend: Math.min(parseFloat(e.target.value) || 0, 10000000) })}
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={onNext}>
            Next Step <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ==========================================
// STEP 3: Team Info
// ==========================================
function Step3Team({ state, updateState, onSubmit, onBack, isSubmitting, submitError }: { state: FormState; updateState: (updates: Partial<FormState>) => void; onSubmit: () => void; onBack: () => void; isSubmitting: boolean; submitError: string | null }) {
  const useCases: { id: UseCase; label: string; desc: string }[] = [
    { id: "coding", label: "Software Engineering", desc: "Writing, reviewing, and shipping code." },
    { id: "writing", label: "Content & Marketing", desc: "Copywriting, blogs, emails, and PR." },
    { id: "data", label: "Data & Research", desc: "Analysis, scraping, and deep research." },
    { id: "mixed", label: "Mixed / General", desc: "A bit of everything across the company." },
  ];

  return (
    <Card className="animate-slide-up glass border-primary/30 glow shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
      <CardHeader className="text-center pb-8 pt-10 relative z-10">
        <CardTitle className="text-3xl font-bold tracking-tight">Final details</CardTitle>
        <CardDescription className="text-base mt-2">This helps our engine identify the most cost-effective alternatives for your specific needs.</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-8 mb-8">
          {/* Team Size */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Total Company / Team Size</label>
            <input
              type="number"
              min="1"
              max="1000000"
              value={state.teamSize}
              onChange={(e) => updateState({ teamSize: Math.min(parseInt(e.target.value) || 1, 1000000) })}
              className="w-full max-w-xs h-10 px-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
          
          {/* Primary Use Case */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Primary AI Use Case</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {useCases.map((uc) => (
                <button
                  key={uc.id}
                  onClick={() => updateState({ useCase: uc.id })}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    state.useCase === uc.id 
                      ? "border-primary bg-primary/10 ring-1 ring-primary" 
                      : "border-border/50 bg-secondary/20 hover:bg-secondary/40 hover:border-border"
                  }`}
                >
                  <div className="font-medium mb-1">{uc.label}</div>
                  <div className="text-xs text-muted-foreground">{uc.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 pt-4 border-t border-border/50">
          {/* Inline error message */}
          {submitError && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium flex items-start gap-2">
              <span className="mt-0.5">⚠️</span>
              <span>{submitError}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button onClick={onSubmit} disabled={isSubmitting} size="lg" className="animate-pulse-glow">
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                <>Run Audit Engine <ChevronRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
