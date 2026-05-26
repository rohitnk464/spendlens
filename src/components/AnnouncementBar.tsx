"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, X, Zap } from "lucide-react";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      {/* Fixed bar at the very top — z-70 so it sits above the nav (z-50) */}
      <div
        className={`fixed top-0 left-0 right-0 z-[70] bg-gradient-to-r from-primary via-accent to-primary text-white text-xs sm:text-sm h-9 flex items-center px-4 transition-all duration-300 ${
          dismissed ? "-translate-y-full pointer-events-none opacity-0" : "translate-y-0"
        }`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 text-center relative">
          <Zap className="w-3.5 h-3.5 flex-shrink-0 animate-pulse" />
          <p className="font-medium leading-none">
            <span className="font-bold">SpendLens</span>
            <span className="hidden sm:inline opacity-90">
              {" — "}Credex Web Dev Intern Assignment · Round 1 Submission{" · "}
            </span>
            <span className="sm:hidden opacity-90"> · </span>
            <Link
              href="/audit"
              className="inline-flex items-center gap-1 font-bold underline underline-offset-2 hover:opacity-80 transition-opacity"
            >
              Try the live audit
              <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="absolute right-0 p-1 rounded hover:bg-white/20 transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Spacer — holds layout space for the bar when it is visible */}
      <div className={`h-9 transition-all duration-300 ${dismissed ? "h-0" : "h-9"}`} />
    </>
  );
}
