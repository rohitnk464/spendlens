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
  User,
  GraduationCap,
  MessageSquare,
  Sparkle,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

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
    avatarColor: "bg-primary/20 text-primary border-primary/20",
    badge: "Hospitality Startup",
  },
  {
    quote: "As an operations agency, we run heavy SEO automations on Claude and OpenAI APIs. SpendLens flagged our massive token costs and recommended Anthropic Prompt Caching and OpenAI Batch runs, saving us $2,640/year!",
    name: "Rohan M Naik",
    role: "Digital Operations Lead",
    company: "Accrete Globus",
    credential: "Automation Expert",
    avatarColor: "bg-accent/20 text-accent border-accent/20",
    badge: "SEO & Ops Agency",
  },
  {
    quote: "Our Java full-stack team had Cursor, Copilot, and ChatGPT Pro seats spread out. SpendLens showed that standardizing on Copilot seats saved us $60/month while fully maintaining IntelliJ IDE capabilities.",
    name: "Ronik Bajakke",
    role: "Associate Software Engineer",
    company: "Empower",
    credential: "Full Stack Developer",
    avatarColor: "bg-success/20 text-success border-success/20",
    badge: "Enterprise Software",
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

  // Smooth count-up animation for Hero Mockup
  useEffect(() => {
    let start = 0;
    const end = 2430;
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
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      
      {/* Premium Ambient Background Gradients */}
      <div className="fixed inset-0 grid-pattern opacity-[0.18] z-0 pointer-events-none" />

      {/* Premium Floating Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40 backdrop-blur-md">
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
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-hover text-white font-semibold text-sm hover:opacity-95 shadow-md shadow-primary/10 hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Start Free Audit
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          <span>The #1 AI Spend Optimizer</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-6 max-w-5xl"
        >
          Stop burning cash on <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">redundant AI tools</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 font-light leading-relaxed"
        >
          Instantly audit your entire AI software stack. Discover cheaper alternatives, right-size team subscriptions, and reclaim your runway in 30 seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5.5 mb-20 w-full sm:w-auto"
        >
          <Link
            href="/audit"
            className="w-full sm:w-auto group inline-flex justify-center items-center gap-3.5 px-9 py-4.5 rounded-full bg-foreground text-background font-bold text-lg hover:opacity-90 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] hover:scale-105 active:scale-95"
          >
            Audit My Stack
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <Lock className="w-4 h-4 text-success" /> No credit card or Plaid link required.
          </div>
        </motion.div>

        {/* Dynamic Mockup Graphic with live counting numbers */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, type: "spring", stiffness: 60 }}
          className="w-full max-w-5xl mx-auto px-2"
        >
          <div className="glass rounded-2xl border border-border shadow-2xl bg-card/45 backdrop-blur-2xl overflow-hidden hover:border-primary/20 transition-colors duration-500">
            <div className="h-12 border-b border-border/80 flex items-center px-5 gap-2 bg-muted/30">
              <div className="w-3.5 h-3.5 rounded-full bg-destructive/60" />
              <div className="w-3.5 h-3.5 rounded-full bg-warning/60" />
              <div className="w-3.5 h-3.5 rounded-full bg-success/60" />
              <div className="mx-auto text-xs font-semibold text-muted-foreground tracking-wide font-mono">spendlens.com/audit/results</div>
            </div>
            
            <div className="p-8 sm:p-14 flex flex-col items-center">
              <div className="text-muted-foreground font-semibold mb-2 uppercase tracking-widest text-xs">Projected Annual Savings</div>
              <motion.div className="text-6xl sm:text-[5.5rem] font-bold tracking-tight text-foreground mb-10 flex items-center font-mono">
                $<span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">{savingsCount.toLocaleString()}</span>
              </motion.div>
              
              <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5.5 rounded-2xl bg-muted/20 border border-border/60 flex justify-between items-center shadow-inner hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-xl">🤖</div>
                    <div className="text-left">
                      <div className="font-bold text-foreground text-sm sm:text-base">ChatGPT Enterprise</div>
                      <div className="text-xs text-muted-foreground font-medium mt-0.5">Switch to ChatGPT Team</div>
                    </div>
                  </div>
                  <div className="text-success font-bold text-base sm:text-lg">-$1,470</div>
                </div>

                <div className="p-5.5 rounded-2xl bg-muted/20 border border-border/60 flex justify-between items-center shadow-inner hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-xl">⚡</div>
                    <div className="text-left">
                      <div className="font-bold text-foreground text-sm sm:text-base">Cursor Business</div>
                      <div className="text-xs text-muted-foreground font-medium mt-0.5">Downgrade to Cursor Pro</div>
                    </div>
                  </div>
                  <div className="text-success font-bold text-base sm:text-lg">-$960</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
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
              <div 
                key={idx}
                className="p-8 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md flex flex-col justify-between shadow-sm hover:border-primary/20 hover:scale-[1.01] transition-all relative overflow-hidden"
              >
                <div className="absolute right-5 top-5 opacity-[0.08]">
                  <MessageSquare className="w-14 h-14" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 text-xs font-bold mb-6">
                    <Sparkle className="w-3 h-3 text-accent" />
                    <span>{t.badge}</span>
                  </div>
                  <p className="text-foreground/95 italic text-sm sm:text-base leading-relaxed mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                
                <div className="flex items-center gap-3.5 border-t border-border/50 pt-5 mt-auto">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm border font-sans ${t.avatarColor}`}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-foreground text-sm tracking-wide">{t.name}</h4>
                    <div className="text-xs text-muted-foreground font-medium mt-0.5">{t.role}</div>
                    <div className="text-[10px] text-primary font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
                      <Building className="w-2.5 h-2.5" /> {t.company}
                    </div>
                  </div>
                </div>
              </div>
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
