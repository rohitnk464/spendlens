"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-black/10 dark:hover:border-white/10"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-zinc-600 dark:text-zinc-400" />
      <Moon className="absolute top-[0.6rem] right-[0.6rem] h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-zinc-600 dark:text-zinc-400" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
