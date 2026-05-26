import SpendForm from "@/components/form/SpendForm";
import Link from "next/link";
import { ArrowLeft, Eye, ListChecks, Cpu, BarChart3 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Start Audit | SpendLens",
  description:
    "Input your AI stack in 30 seconds to get a free, instant spend audit and discover exactly how much you can save.",
};

const STEPS = [
  { icon: ListChecks, label: "Select Your Stack", desc: "Choose tools & seats" },
  { icon: Cpu,         label: "Engine Calculates",  desc: "Deterministic audit" },
  { icon: BarChart3,   label: "View Savings",        desc: "CFO-grade report"   },
];

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <Eye className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="text-sm font-bold tracking-tight">SpendLens</span>
            </div>
          </div>
        </header>

        {/* Page heading */}
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Build your <span className="gradient-text">AI Stack</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Select your tools, plans, and seats. Our deterministic engine
            calculates exactly how much you can save —{" "}
            <span className="text-foreground font-semibold">in seconds</span>.
          </p>
        </div>

        {/* 3-step visual progress indicator */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-start justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-5 left-[calc(16.67%)] right-[calc(16.67%)] h-[2px] bg-gradient-to-r from-primary/40 via-accent/40 to-success/40" />

            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const colors = [
                "bg-primary/10 text-primary border-primary/20",
                "bg-accent/10 text-accent border-accent/20",
                "bg-success/10 text-success border-success/20",
              ];
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2 z-10 flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${colors[i]} backdrop-blur-sm`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-foreground">
                      {step.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {step.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <SpendForm />
      </div>
    </main>
  );
}

