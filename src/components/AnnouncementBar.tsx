"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, X, Zap } from "lucide-react";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative z-[60] w-full bg-gradient-to-r from-primary/90 via-accent/90 to-primary/90 text-white text-sm py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-center">
        <Zap className="w-4 h-4 flex-shrink-0 animate-pulse" />
        <p className="font-medium">
          <span className="font-bold">SpendLens</span>
          {" — "}
          <span className="opacity-90">Credex Web Dev Intern Assignment · Round 1 Submission</span>
          {" · "}
          <Link
            href="/audit"
            className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Try the live audit
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
