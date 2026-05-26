"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Zap,
  TrendingDown,
  Sparkles,
  Eye,
  Lock,
  ChevronDown,
  Building,
  Sparkle,
  Star,
  Check,
  Quote,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnnouncementBar } from "@/components/AnnouncementBar";

const TOOLS = [
  { name: "Cursor", logo: "⚡" },
  { name: "ChatGPT", logo: "🤖" },
  { name: "Claude", logo: "🧠" },
  { name: "Copilot", logo: "🐙" },
  { name: "Gemini", logo: "✨" },
  { name: "Windsurf", logo: "🏄‍♂️" },
];

const TESTIMONIALS = [
  {
    quote: "We were paying for both Cursor Pro and GitHub Copilot seats for 5 devs, plus separate Claude accounts. SpendLens flagged the redundancy and showed us how to consolidate. We save $110/month with zero loss in speed!",
    name: "Praveen Hatti",
    role: "Co-Founder",
    company: "Nistula Hospitality",
    credential: "IIM Ahmedabad Alumnus",
    avatarColor: "bg-gradient-to-tr from-primary/10 to-primary/30 text-primary border-primary/25 shadow-sm shadow-primary/5",
    badge: "Hospitality Startup",
    stars: 5,
    verified: true,
    tools: ["Cursor", "Copilot", "Claude"],
  },
  {
    quote: "As an operations agency, we run heavy SEO automations on Claude and OpenAI APIs. SpendLens flagged our massive token costs and recommended Anthropic Prompt Caching and OpenAI Batch runs, saving us $2,640/year!",
    name: "Rohan M Naik",
    role: "Digital Operations Lead",
    company: "Accrete Globus",
    credential: "Automation Expert",
    avatarColor: "bg-gradient-to-tr from-accent/10 to-accent/30 text-accent border-accent/25 shadow-sm shadow-accent/5",
    badge: "SEO & Ops Agency",
    stars: 5,
    verified: true,
    tools: ["Claude API", "OpenAI API"],
  },
  {
    quote: "Our Java full-stack team had Cursor, Copilot, and ChatGPT Pro seats spread out. SpendLens showed that standardizing on Copilot seats saved us $60/month while fully maintaining IntelliJ IDE capabilities.",
    name: "Ronik Bajakke",
    role: "Associate Software Engineer",
    company: "Empower",
    credential: "Full Stack Developer",
    avatarColor: "bg-gradient-to-tr from-success/10 to-success/30 text-success border-success/25 shadow-sm shadow-success/5",
    badge: "Enterprise Software",
    stars: 5,
    verified: true,
    tools: ["Cursor", "Copilot", "ChatGPT"],
  },
];

const FAQ = [
  {
    q: "How does SpendLens calculate my savings?",
    a: "We use a fully deterministic pricing database containing official tiers from all major providers (Cursor, ChatGPT, Claude, Gemini, Copilot, API keys). The engine runs four strict checks (plan right-sizing, cheaper alternatives, API arbitrage, and Credex discounts) to calculate mathematically sound overlaps without any LLM pricing hallucinations.",
  },
  {
    q: "Do I have to connect my bank account or credit card?",
    a: "No! SpendLens is fully anonymous and privacy-first. We do not integrate with Plaid, request bank statements, or ask for cards. You simply select your tools and seats in our 30-second wizard, and we calculate your savings instantly.",
  },
  {
    q: "Is my data safe?",
    a: "Absolutely. All audits are saved under random, secure UUIDs in Supabase, guarded by strict Row Level Security (RLS). All calculations happen server-side inside Next.js secure API routes. Your email is only captured if you willingly request a report at the end.",
  },
  {
    q: "What is the 'Credex' discount recommended in the report?",
    a: "Credex is our partner platform that sells discounted AI infrastructure credits for tools like Cursor, Claude Pro, ChatGPT, and raw developer APIs. By purchasing credit pools through Credex, you can save an additional 15% to 30% on your subscriptions, which our engine factors directly into your report.",
  },
  {
    q: "How accurate are the alternative tool recommendations?",
    a: "Extremely. Our engine doesn't just suggest the cheapest tool; it respects your workflow. If your focus is 'coding', we compare developer IDE tools like Cursor and Copilot. If your use case is 'writing' or 'research', we recommend Gemini or Claude Pro, ensuring you only switch to alternatives that match your requirements.",
  },
];

export default function HomePage() {
  const [savingsCount, setSavingsCount] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Smooth count-up animation for Hero Mockup (representing $9,840 annual savings)
  useEffect(() => {
    let start = 0;
    const end = 9840;
    const duration = 2000; // 2 seconds
    const incrementTime = 30;
    const totalSteps = Math.ceil(duration / incrementTime);
    const stepValue = end / totalSteps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        clearInterval(timer);
        setSavingsCount(end);
      } else {
        setSavingsCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30 relative">
      <AnnouncementBar />
      
      {/* Premium Ambient Background Gradients */}
      <div className="fixed inset-0 grid-pattern opacity-[0.14] z-0 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[700px] bg-gradient-to-b from-transparent to-background pointer-events-none z-0" />


      {/* Premium Floating Navigation — sits below the announcement bar (top-9 = 36px) */}
      <nav className="fixed top-9 left-0 right-0 z-50 glass border-b border-border/40 backdrop-blur-md transition-[top] duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 group-hover:opacity-90 transition-opacity">SpendLens</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-sm hover:opacity-95 shadow-md shadow-primary/10 hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Start Free Audit
            </Link>
          </div>
        </div>
      </nav>

      {/* Futuristic Hero Section Redesign — pt-44 clears both the banner (36px) + nav (64px) + breathing room */}
      <section className="relative pt-44 pb-24 lg:pt-52 lg:pb-36 px-6 z-20 overflow-visible">
        {/* Soft atmospheric gradients */}
        <div className="absolute inset-0 grid-pattern opacity-[0.06] dark:opacity-[0.11] z-0 pointer-events-none" />
        <div className="absolute top-[10%] left-[20%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-primary/10 dark:bg-primary/5 blur-[110px] pointer-events-none z-0" />
        <div className="absolute bottom-[20%] right-[10%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-accent/8 dark:bg-accent/5 blur-[130px] pointer-events-none z-0 animate-pulse-glow" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10">
          
          {/* LEFT COLUMN: Catchy Value Prop & Badges */}
          <div className="lg:col-span-7 flex flex-col items-start text-left relative z-20">
            
            {/* Elegant Responsive Badges Row (Replaces messy drifting absolute cards) */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {/* Badge 1: #1 AI Spend Optimizer */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 dark:bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm cursor-default hover:border-primary/40 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span>#1 AI Spend Optimizer</span>
              </motion.div>

              {/* Badge 2: Waste Detected Alert */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-destructive/25 bg-destructive/10 dark:bg-destructive/5 text-destructive text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm cursor-default hover:border-destructive/40 transition-colors"
              >
                <TrendingDown className="w-3.5 h-3.5 text-destructive animate-bounce" />
                <span>Waste Detected: -$320/mo</span>
              </motion.div>

              {/* Badge 3: Credex Active Discount */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-success/25 bg-success/10 dark:bg-success/5 text-success text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm cursor-default hover:border-success/40 transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-success animate-pulse" />
                <span>Credex: -25% Off</span>
              </motion.div>
            </div>

            {/* Bold Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6 text-foreground"
            >
              Stop burning cash on <br />
              <span className="relative inline-block mt-2 pb-1.5">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1a73e8] via-[#6366f1] to-[#8b5cf6] dark:from-[#8ab4f8] dark:via-[#c084fc] dark:to-[#f472b6]">
                  redundant AI tools.
                </span>
                <span className="absolute left-0 bottom-0.5 w-full h-[3px] bg-gradient-to-r from-primary/0 via-primary/40 to-accent/0 rounded-full blur-[1px]" />
              </span>
            </motion.h1>

            {/* High-contrast description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-xl font-light leading-relaxed"
            >
              Instantly audit your entire AI software stack. Discover cheaper alternatives, right-size team subscriptions, and <span className="text-primary dark:text-primary font-semibold">reclaim your runway</span> in 30 seconds.
            </motion.p>

            {/* Main CTA button and trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full sm:w-auto"
            >
              <Link
                href="/audit"
                className="relative group rounded-full p-[1.5px] overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/45 transition-all duration-300 w-full sm:w-auto active:scale-95 shadow-lg shadow-primary/10 hover:shadow-primary/25"
              >
                {/* Custom glowing border background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-success rounded-full opacity-85 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow" />
                <div className="relative px-8 py-4 rounded-full bg-black text-white font-bold text-base sm:text-lg flex justify-center items-center gap-3 transition-colors group-hover:bg-neutral-950">
                  Audit My Stack
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm text-muted-foreground font-semibold py-2 sm:py-0">
                <div className="w-7 h-7 rounded-full bg-success/15 dark:bg-success/10 border border-success/20 flex items-center justify-center text-success shadow-inner animate-pulse">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <span>No credit card or Plaid required</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Organized 3D Spend Cockpit Dashboard */}
          <div className="lg:col-span-5 relative w-full flex justify-center items-center lg:pl-6 min-h-[480px] lg:min-h-0 z-20">
            
            {/* Ambient visual glowing spheres */}
            <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-violet-500/10 dark:bg-violet-500/5 blur-[80px] pointer-events-none z-0" />
            <div className="absolute bottom-[15%] right-[10%] w-60 h-60 rounded-full bg-pink-500/10 dark:bg-pink-500/5 blur-[70px] pointer-events-none z-0 animate-pulse" />
            <div className="absolute top-[40%] right-[30%] w-52 h-52 rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[60px] pointer-events-none z-0" />

            {/* Symmetrical 4-Corner Floating Framework */}
            
            {/* ↗ Top-Right Corner Orbit: ChatGPT Pro */}
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 z-30 px-3.5 py-1.5 rounded-full border border-border bg-card/85 dark:bg-card/90 backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-semibold hover:border-primary/30 transition-colors"
            >
              <span className="text-base">🤖</span>
              <span>ChatGPT Pro</span>
            </motion.div>

            {/* ↙ Bottom-Left Corner Orbit: Gemini Pro */}
            <motion.div
              animate={{ y: [0, 8, 0], x: [0, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 -left-6 z-30 px-3.5 py-1.5 rounded-full border border-border bg-card/85 dark:bg-card/90 backdrop-blur-md shadow-lg flex items-center gap-2 text-xs font-semibold hover:border-success/30 transition-colors"
            >
              <span className="text-base">✨</span>
              <span>Gemini Pro</span>
            </motion.div>

            {/* ↖ Top-Left Corner Card: Cursor Downgrade Option */}
            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, -0.5, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -left-6 z-40 hidden md:flex items-center gap-3 px-4.5 py-3 rounded-2xl border border-border/80 bg-card/90 dark:bg-card/95 backdrop-blur-md shadow-2xl hover:border-primary/40 transition-colors cursor-default"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-xl">⚡</div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide">Cursor Switch</div>
                <div className="text-xs font-extrabold text-foreground">Downgrade to Pro (-$100)</div>
              </div>
            </motion.div>

            {/* ↘ Bottom-Right Corner Card: Credex Optimization Indicator */}
            <motion.div
              animate={{ y: [0, 6, 0], rotate: [0, 0.5, 0] }}
              transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-8 -right-6 z-40 hidden md:flex items-center gap-3 px-4.5 py-3 rounded-2xl border border-border/80 bg-card/90 dark:bg-card/95 backdrop-blur-md shadow-2xl hover:border-success/45 transition-colors cursor-default shadow-neon-emerald"
            >
              <div className="w-9 h-9 rounded-xl bg-success/15 flex items-center justify-center text-success animate-pulse">
                <Check className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold text-success uppercase tracking-wide">Credex Activated</div>
                <div className="text-xs font-extrabold text-foreground">Saved $2,430/yr via credits</div>
              </div>
            </motion.div>

            {/* Main dashboard cocktail wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 55, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 50 }}
              className="w-full relative z-10 glass rounded-3xl border border-border/75 shadow-2xl bg-card/25 dark:bg-card/35 backdrop-blur-3xl overflow-hidden hover:border-primary/30 transition-all duration-500 shadow-neon-blue pointer-events-auto"
            >
              {/* Browser control bars */}
              <div className="h-11 border-b border-border/60 flex items-center px-4 gap-2 bg-muted/20">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="mx-auto text-[10px] font-semibold text-muted-foreground tracking-wide font-mono bg-muted/30 dark:bg-muted/40 px-4 py-0.5 rounded-full border border-border/30">
                  spendlens.com/dashboard
                </div>
                <div className="w-12 h-2" />
              </div>

              {/* Console Dashboard body */}
              <div className="p-6 flex flex-col gap-5.5">
                
                {/* Real-time spend indicators */}
                <div className="flex justify-between items-end border-b border-border/30 pb-4">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Corporate Stack Burn</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2">
                      <span>$1,240</span>
                      <span className="text-xs font-semibold text-muted-foreground">/mo current</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-success tracking-wider mb-1">Optimized Path</div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-success flex items-center justify-end gap-1.5">
                      <span>$420</span>
                      <span className="text-xs font-semibold text-success/80">/mo</span>
                    </div>
                  </div>
                </div>

                {/* Spectacular vector animated spline spend graph */}
                <div className="relative h-44 w-full bg-muted/10 dark:bg-muted/15 rounded-2xl border border-border/40 overflow-hidden p-4 flex flex-col justify-between shadow-inner">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.06] dark:opacity-[0.09] p-4">
                    <div className="w-full h-[1px] bg-foreground" />
                    <div className="w-full h-[1px] bg-foreground" />
                    <div className="w-full h-[1px] bg-foreground" />
                    <div className="w-full h-[1px] bg-foreground" />
                  </div>
                  <div className="absolute inset-0 flex justify-between pointer-events-none opacity-[0.06] dark:opacity-[0.09] p-4">
                    <div className="w-[1px] h-full bg-foreground" />
                    <div className="w-[1px] h-full bg-foreground" />
                    <div className="w-[1px] h-full bg-foreground" />
                    <div className="w-[1px] h-full bg-foreground" />
                  </div>

                  {/* Morphing Path SVG curves */}
                  <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Pulsing fill area */}
                    <motion.path
                      initial={{ d: "M 0 30 Q 25 35 50 40 T 100 45 L 100 100 L 0 100 Z" }}
                      animate={{ 
                        d: [
                          "M 0 30 Q 25 45 50 35 T 100 40 L 100 100 L 0 100 Z", 
                          "M 0 25 Q 30 20 60 70 T 100 80 L 100 100 L 0 100 Z", 
                          "M 0 28 Q 28 32 55 75 T 100 82 L 100 100 L 0 100 Z"
                        ]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      fill="url(#areaGradient)"
                    />

                    {/* Smooth Neon Spline Line */}
                    <motion.path
                      initial={{ d: "M 0 30 Q 25 35 50 40 T 100 45" }}
                      animate={{ 
                        d: [
                          "M 0 30 Q 25 45 50 35 T 100 40", 
                          "M 0 25 Q 30 20 60 70 T 100 80",
                          "M 0 28 Q 28 32 55 75 T 100 82"
                        ]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      fill="none"
                      stroke="url(#curveGradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Drifting marker point */}
                    <motion.circle
                      animate={{
                        cy: [40, 80, 82],
                        scale: [1, 1.25, 1]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                      cx="100"
                      cy="82"
                      r="4"
                      fill="#ec4899"
                      className="filter drop-shadow-[0_0_8px_#ec4899]"
                    />
                  </svg>

                  {/* Header overlay markers */}
                  <div className="flex justify-between items-start z-10 w-full">
                    <div className="px-2.5 py-0.5 rounded bg-card/60 backdrop-blur-sm text-[8px] font-bold text-muted-foreground border border-border/30">Baseline Spend</div>
                    <div className="px-2.5 py-0.5 rounded bg-success/15 backdrop-blur-sm text-[8px] font-bold text-success border border-success/35">CFO Optimized</div>
                  </div>

                  {/* Bottom overlay labels */}
                  <div className="flex justify-between items-end z-10 w-full mt-auto">
                    <div className="text-[10px] font-extrabold text-foreground/80 font-mono">$1,240/mo</div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                      <span className="text-[10px] font-extrabold text-success font-mono">-$820 saved (-66%)</span>
                    </div>
                  </div>
                </div>

                {/* Sub-grid Metrics metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-muted/10 dark:bg-muted/15 border border-border/40 text-center hover:bg-muted/20 dark:hover:bg-muted/25 transition-all">
                    <div className="text-[8px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Total Savings</div>
                    <div className="text-base font-extrabold text-foreground font-mono">66%</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-muted/10 dark:bg-muted/15 border border-border/40 text-center hover:bg-muted/20 dark:hover:bg-muted/25 transition-all">
                    <div className="text-[8px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Annual Boost</div>
                    <div className="text-base font-extrabold text-success font-mono">+$9.8K</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-muted/10 dark:bg-muted/15 border border-border/40 text-center hover:bg-muted/20 dark:hover:bg-muted/25 transition-all">
                    <div className="text-[8px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Runway Ext.</div>
                    <div className="text-base font-extrabold text-primary font-mono">+4.2mo</div>
                  </div>
                </div>

                {/* Optimizations detail list */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/40 bg-muted/10 text-xs hover:bg-muted/20 transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                        <TrendingDown className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-foreground">Redundant IDE seats optimized</span>
                    </div>
                    <span className="text-success font-bold font-mono">-$100/mo</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/40 bg-muted/10 text-xs hover:bg-muted/20 transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-foreground">Claude Prompt Caching configured</span>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 bg-violet-500/15 text-violet-400 font-bold tracking-wider rounded ml-1 border border-violet-500/20">API</span>
                    </div>
                    <span className="text-success font-bold font-mono">-$340/mo</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/40 bg-muted/10 text-xs hover:bg-muted/20 transition-all">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-foreground">Partner Credex discounts enabled</span>
                    </div>
                    <span className="text-success font-bold font-mono">-$380/mo</span>
                  </div>
                </div>

                {/* Big counting animated total annual projected savings display */}
                <div className="mt-2 border-t border-border/30 pt-4 text-center">
                  <div className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest mb-1.5">Projected Annual Savings</div>
                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-mono flex justify-center items-center">
                    <span>$</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-foreground/75">{savingsCount.toLocaleString()}</span>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Infinite Integrations Strip */}
      <section className="py-12 border-y border-border/40 bg-secondary/15 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <p className="text-center text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-widest">
            Cross-Referencing Official SaaS & API Pricing Plans
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6.5 opacity-90">
            {TOOLS.map((tool) => (
              <div 
                key={tool.name}
                className="flex items-center gap-3.5 px-5 py-2.5 rounded-full border border-border/60 bg-card shadow-sm hover:border-primary/20 hover:scale-105 active:scale-95 transition-all cursor-default"
              >
                <span className="text-2xl">{tool.logo}</span>
                <span className="font-bold text-sm tracking-wide text-foreground">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* "How It Works" Section */}
      <section className="py-32 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Audit Engine Workflow</h2>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight">Audit your stack in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-border/50 bg-card/25 backdrop-blur-sm relative hover:border-primary/20 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-lg text-primary mb-6 font-mono border border-primary/10">01</div>
              <h3 className="text-xl font-bold mb-3">Select Your Stack</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">Input the AI developer, copywriting, or automation tools your team currently expenses, along with your seat counts.</p>
            </div>
            
            <div className="p-8 rounded-3xl border border-border/50 bg-card/25 backdrop-blur-sm relative hover:border-accent/20 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center font-bold text-lg text-accent mb-6 font-mono border border-accent/10">02</div>
              <h3 className="text-xl font-bold mb-3">Deterministic Engine Pass</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">Our TypeScript calculator runs plan right-sizing, seat consolidation, API arbitrage, and discount credit checks.</p>
            </div>

            <div className="p-8 rounded-3xl border border-border/50 bg-card/25 backdrop-blur-sm relative hover:border-success/20 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center font-bold text-lg text-success mb-6 font-mono border border-success/10">03</div>
              <h3 className="text-xl font-bold mb-3">Get CFO Recommendations</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">Instantly view your custom dashboard with sub-second qualitative Google Gemini reports and transactional PDF summaries.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Box Value Propositions */}
      <section className="py-24 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-left">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Built for High Performance</h2>
            <p className="text-4xl sm:text-6xl font-bold tracking-tight">
              Everything you need to <br/>
              <span className="text-muted-foreground">optimize your software runway.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Bento Card 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="md:col-span-2 glass rounded-3xl p-8 sm:p-10 flex flex-col justify-between group hover:border-primary/30 transition-all border border-border/50 shadow-sm relative overflow-hidden"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary border border-primary/10">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">Deterministic Pricing Engine</h3>
                <p className="text-muted-foreground text-sm sm:text-lg max-w-lg leading-relaxed">
                  We cross-reference our local pricing matrices with verified data points from vendors to calculate true cost overlaps, completely bypassing the arithmetic limitations of standalone LLMs.
                </p>
              </div>
            </motion.div>

            {/* Square Bento Card 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-3xl p-8 flex flex-col justify-between group hover:border-accent/30 transition-all border border-border/50 shadow-sm"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-accent border border-accent/10">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Instant Dashboards</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Get audited in under 30 seconds. No sales calls, no onboarding paperwork, and absolutely no credit card required to view your projected savings.
                </p>
              </div>
            </motion.div>

            {/* Square Bento Card 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-3xl p-8 flex flex-col justify-between group hover:border-success/30 transition-all border border-border/50 shadow-sm"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center mb-6 text-success border border-success/10">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Private & Anonymous</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your corporate privacy is fully secured. We never collect company names, sensitive bank accounts, or require complex API platform tokens.
                </p>
              </div>
            </motion.div>

            {/* Large Bento Card 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="md:col-span-2 glass rounded-3xl p-8 sm:p-10 flex flex-col justify-between group hover:border-accent/30 transition-all border border-border/50 shadow-sm relative overflow-hidden"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-accent border border-accent/10">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">Google Gemini CFO Advisory</h3>
                <p className="text-muted-foreground text-sm sm:text-lg max-w-lg leading-relaxed">
                  Every calculated spend audit dynamically instantiates Gemini 2.5 Flash on the server, generating sub-second qualitative summaries explaining why each downgrade or tool switch is recommended.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Real-World Social Proof Testimonials */}
      <section className="py-24 px-6 z-10 bg-secondary/10 border-y border-border/40 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Startup Validation</h2>
            <p className="text-4xl sm:text-5xl font-bold tracking-tight">What founders & engineers say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl border border-border/50 bg-card/45 backdrop-blur-md flex flex-col justify-between shadow-sm hover:border-primary/20 transition-all relative overflow-hidden pointer-events-auto"
              >
                <div className="absolute right-6 top-6 opacity-[0.06] text-foreground pointer-events-none">
                  <Quote className="w-12 h-12" />
                </div>
                <div>
                  {/* Card Header: Category Badge & Stars */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-[10px] font-bold">
                      <Sparkle className="w-3 h-3 text-accent" />
                      <span>{t.badge}</span>
                    </div>
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-foreground/90 italic text-sm sm:text-base leading-relaxed mb-6 font-light">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Audited Tool Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-8">
                    <span className="text-[9px] uppercase font-bold text-muted-foreground/80 tracking-wider">Audited Stack:</span>
                    {t.tools.map((tool) => (
                      <span key={tool} className="text-[10px] font-semibold px-2.5 py-0.5 rounded bg-muted/65 border border-border/60 text-muted-foreground">{tool}</span>
                    ))}
                  </div>
                </div>
                
                {/* Author Info & Verified Tag */}
                <div className="flex items-center gap-3.5 border-t border-border/50 pt-5 mt-auto">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm border font-sans ${t.avatarColor}`}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-foreground text-sm tracking-wide flex items-center gap-1.5">
                      {t.name}
                      <div className="w-4 h-4 rounded-full bg-success/15 border border-success/20 flex items-center justify-center text-[9px] text-success shadow-inner" title="Verified Audit">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                    </h4>
                    <div className="text-xs text-muted-foreground font-medium mt-0.5 flex flex-wrap items-center gap-1">
                      <span>{t.role}</span>
                      <span className="text-muted-foreground/30 font-light text-[10px]">•</span>
                      <span className="text-primary text-[10px] font-bold tracking-tight">{t.credential}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1">
                      <Building className="w-2.5 h-2.5 text-muted-foreground/75" /> {t.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion Section */}
      <section className="py-32 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Frequently Asked Questions</h2>
            <p className="text-3xl sm:text-5xl font-bold tracking-tight">Have questions? We have answers.</p>
          </div>

          <div className="space-y-4">
            {FAQ.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-border/50 bg-card/20 overflow-hidden backdrop-blur-sm transition-colors duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5.5 flex items-center justify-between text-left font-bold text-sm sm:text-base text-foreground hover:bg-muted/10 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/30 pt-4 bg-muted/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Conversion Block */}
      <section className="py-32 px-6 z-10 border-t border-border/40 relative overflow-hidden bg-secondary/15">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 text-foreground leading-none">
            Ready to stop burning runway?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-base sm:text-lg mb-10 leading-relaxed font-light">
            Audit your team's AI tool subscriptions and re-claim your software burn in 30 seconds.
          </p>
          <Link
            href="/audit"
            className="inline-flex justify-center items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:opacity-95 shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Start Free Audit
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40 z-10 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground">SpendLens</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Credex. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
