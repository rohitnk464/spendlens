"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Zap,
  TrendingDown,
  Sparkles,
  Eye,
  Lock,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const TOOLS = [
  { name: "Cursor", logo: "⚡" },
  { name: "ChatGPT", logo: "🤖" },
  { name: "Claude", logo: "🧠" },
  { name: "Copilot", logo: "🐙" },
  { name: "Gemini", logo: "✨" },
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 grid-pattern opacity-30 z-0 pointer-events-none" />
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/10 group-hover:bg-primary/20 transition-all">
              <Eye className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-bold tracking-tight">SpendLens</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-all hover:scale-105 active:scale-95"
            >
              Start Audit
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>The #1 AI Spend Optimizer</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[1.05] mb-6 max-w-5xl"
        >
          Stop burning cash on <span className="gradient-text">redundant AI</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light"
        >
          Instantly audit your entire AI stack. Discover cheaper alternatives, right-size your plans, and save thousands in 60 seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full sm:w-auto"
        >
          <Link
            href="/audit"
            className="w-full sm:w-auto group inline-flex justify-center items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all hover:shadow-[0_4px_20px_-5px_rgba(26,115,232,0.5)] active:scale-95"
          >
            Audit My Stack
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" /> No credit card required.
          </div>
        </motion.div>

        {/* The "App Mockup" Hero Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, delay: 0.4, type: "spring", bounce: 0.4 }}
          style={{ perspective: "1000px" }}
          className="w-full max-w-5xl mx-auto"
        >
          <div className="glass rounded-2xl border border-border overflow-hidden shadow-2xl bg-card/40 backdrop-blur-3xl">
            <div className="h-12 border-b border-border flex items-center px-4 gap-2 bg-muted/50">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-warning/80" />
              <div className="w-3 h-3 rounded-full bg-success/80" />
              <div className="mx-auto text-xs font-medium text-muted-foreground">spendlens.com/audit/results</div>
            </div>
            <div className="p-8 sm:p-12 flex flex-col items-center">
              <div className="text-muted-foreground font-medium mb-2 uppercase tracking-widest text-sm">Projected Annual Savings</div>
              <div className="text-6xl sm:text-8xl font-bold tracking-tighter text-foreground mb-8">$2,400</div>
              
              <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <div className="font-semibold text-foreground">ChatGPT Enterprise</div>
                      <div className="text-xs text-muted-foreground">Switch to Team Plan</div>
                    </div>
                  </div>
                  <div className="text-success font-semibold">-$1,200</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <div className="font-semibold text-foreground">Cursor Business</div>
                      <div className="text-xs text-muted-foreground">Downgrade to Pro</div>
                    </div>
                  </div>
                  <div className="text-success font-semibold">-$960</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Integrations Strip */}
      <section className="py-12 border-y border-border bg-secondary/30 z-10">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-widest">
            Analyzing pricing for top developer tools
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 opacity-80">
            {TOOLS.map((tool, i) => (
              <motion.div 
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card shadow-sm"
              >
                <span className="text-xl">{tool.logo}</span>
                <span className="font-medium text-foreground">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Box Features */}
      <section className="py-32 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tighter mb-6">
              Everything you need to <br/>
              <span className="text-muted-foreground">optimize your burn rate.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Large Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 glass rounded-3xl p-8 flex flex-col justify-between group hover:border-primary/50 transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold mb-2">Deterministic Math</h3>
                <p className="text-muted-foreground text-lg max-w-md">Our engine pulls exact pricing from official API docs and SaaS tiers to calculate true overlaps.</p>
              </div>
            </motion.div>

            {/* Square Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 flex flex-col justify-between group hover:border-accent/50 transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Instant Results</h3>
                <p className="text-muted-foreground">No sales calls. Fill out the 3-step form and get your customized dashboard instantly.</p>
              </div>
            </motion.div>

            {/* Square Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 flex flex-col justify-between group hover:border-success/50 transition-colors"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-6 text-success">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Private & Secure</h3>
                <p className="text-muted-foreground">We don&apos;t ask for your company name or connect to your bank accounts.</p>
              </div>
            </motion.div>

            {/* Large Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-2 glass rounded-3xl p-8 flex flex-col justify-between group hover:border-primary/50 transition-colors relative overflow-hidden"
            >
              <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold mb-2">Powered by Google Gemini</h3>
                <p className="text-muted-foreground text-lg max-w-md">Every audit receives a custom-generated executive summary analyzing exactly why you should switch tools.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 z-10 border-t border-border relative">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-8 text-foreground">
            Ready to stop burning runway?
          </h2>
          <Link
            href="/audit"
            className="inline-flex justify-center items-center gap-3 px-10 py-5 rounded-full bg-foreground text-background font-bold text-xl hover:opacity-90 transition-all hover:scale-105 active:scale-95"
          >
            Start Free Audit
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border z-10 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Eye className="w-3 h-3 text-background" />
            </div>
            <span className="text-sm font-bold tracking-tight text-foreground">SpendLens</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Credex. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
