"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="inline-flex items-center p-3 sm:px-4 sm:py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
    >
      {copied ? (
        <><Check className="w-4 h-4 mr-2 text-green-500" /> Copied!</>
      ) : (
        <><Share2 className="w-4 h-4 mr-2" /> Share Report</>
      )}
    </button>
  );
}
