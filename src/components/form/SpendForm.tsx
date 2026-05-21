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
  const [state, setState] = useState<FormState>({
    tools: [],
    teamSize: 1,
    useCase: "mixed",
    currentStep: 1,
  });

  // Load from localStorage on mount
  useEffect(() => {
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
        alert("Failed to generate audit: " + (result.error || "Unknown error"));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error submitting audit:", error);
      alert("Failed to connect to the server. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
          <span className={state.currentStep >= 1 ? "text-primary" : ""}>Select Tools</span>
          <span className={state.currentStep >= 2 ? "text-primary" : ""}>Configure Plans</span>
          <span className={state.currentStep >= 3 ? "text-primary" : ""}>Team Details</span>
        </div>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-in-out"
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
          />
        )}
      </div>
    </div>
  );
}

// ==========================================
// STEP 1: Select Tools
// ==========================================
function Step1Tools({ state, updateState, onNext }: any) {
  const allTools = getAllTools();
  
  const toggleTool = (toolId: AITool) => {
    const isSelected = state.tools.some((t: UserToolEntry) => t.tool === toolId);
    
    if (isSelected) {
      updateState({
        tools: state.tools.filter((t: UserToolEntry) => t.tool !== toolId)
      });
    } else {
      // Add with defaults
      const plans = getToolPlans(toolId);
      const defaultPlan = plans[0]?.id || "";
      
      updateState({
        tools: [
          ...state.tools, 
          { tool: toolId, planId: defaultPlan, monthlySpend: 0, seats: 1 }
        ]
      });
    }
  };

  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>What AI tools are you paying for?</CardTitle>
        <CardDescription>Select all the tools your team currently uses.</CardDescription>
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
function Step2Plans({ state, updateState, onNext, onBack }: any) {
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
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Configure your subscriptions</CardTitle>
        <CardDescription>Tell us which plans you're on and your approximate monthly spend.</CardDescription>
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
                        value={entry.seats}
                        onChange={(e) => updateTool(index, { seats: parseInt(e.target.value) || 1 })}
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
                      value={entry.monthlySpend}
                      onChange={(e) => updateTool(index, { monthlySpend: parseFloat(e.target.value) || 0 })}
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
function Step3Team({ state, updateState, onSubmit, onBack, isSubmitting }: any) {
  const useCases: { id: UseCase; label: string; desc: string }[] = [
    { id: "coding", label: "Software Engineering", desc: "Writing, reviewing, and shipping code." },
    { id: "writing", label: "Content & Marketing", desc: "Copywriting, blogs, emails, and PR." },
    { id: "data", label: "Data & Research", desc: "Analysis, scraping, and deep research." },
    { id: "mixed", label: "Mixed / General", desc: "A bit of everything across the company." },
  ];

  return (
    <Card className="animate-slide-up border-primary/20 glow">
      <CardHeader>
        <CardTitle>Final details</CardTitle>
        <CardDescription>This helps our engine identify the most cost-effective alternatives for your specific needs.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 mb-8">
          {/* Team Size */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Total Company / Team Size</label>
            <input
              type="number"
              min="1"
              value={state.teamSize}
              onChange={(e) => updateState({ teamSize: parseInt(e.target.value) || 1 })}
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
        
        <div className="flex justify-between items-center pt-4 border-t border-border/50">
          <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting} size="lg" className="animate-pulse-glow">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
              </>
            ) : (
              <>Run Audit Engine <ChevronRight className="w-4 h-4 ml-2" /></>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
