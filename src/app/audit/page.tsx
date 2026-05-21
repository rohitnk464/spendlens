import SpendForm from "@/components/form/SpendForm";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";

export const metadata = {
  title: "Start Audit",
  description: "Input your AI stack to get a free, instant spend audit.",
};

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Eye className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold tracking-tight">SpendLens</span>
          </div>
        </header>

        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Build your <span className="gradient-text">AI Stack</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Select your tools, plans, and spend. Our engine will calculate exactly how much you can save in seconds.
          </p>
        </div>

        <SpendForm />
      </div>
    </main>
  );
}
