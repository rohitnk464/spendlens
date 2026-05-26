import Link from "next/link";
import { ArrowLeft, Eye, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-[0.08] pointer-events-none" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-md">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2.5 mb-12 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">SpendLens</span>
        </Link>

        {/* Icon */}
        <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
          <SearchX className="w-10 h-10 text-primary" />
        </div>

        {/* Copy */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          404
        </h1>
        <p className="text-xl font-semibold text-foreground mb-3">
          Audit not found
        </p>
        <p className="text-muted-foreground text-base leading-relaxed mb-10">
          This audit link is invalid or has expired. Audits are stored securely
          and may expire after inactivity. Run a new audit to get fresh savings
          insights.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-white font-bold hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Start New Audit
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-border bg-card hover:border-primary/30 text-foreground font-semibold transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
