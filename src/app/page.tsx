"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Shield,
  Zap,
  TrendingDown,
  Users,
  FileText,
  ChevronDown,
  Sparkles,
  DollarSign,
  Eye,
} from "lucide-react";

const TOOLS = [
  { name: "Cursor", logo: "⚡" },
  { name: "ChatGPT", logo: "🤖" },
  { name: "Claude", logo: "🧠" },
  { name: "GitHub Copilot", logo: "🐙" },
  { name: "Gemini", logo: "✨" },
  { name: "Windsurf", logo: "🏄" },
];

const STATS = [
  { value: "$2,400", label: "Avg. annual savings found", prefix: "" },
  { value: "47%", label: "of teams overspend on AI", prefix: "" },
  { value: "< 2min", label: "to complete audit", prefix: "" },
];

const STEPS = [
  {
    icon: FileText,
    title: "Input Your Stack",
    description:
      "Tell us what AI tools you use, which plans, team size, and how much you pay.",
  },
  {
    icon: BarChart3,
    title: "Get Your Audit",
    description:
      "Our engine analyzes every subscription — plan fit, cheaper alternatives, and hidden savings.",
  },
  {
    icon: TrendingDown,
    title: "Save Money",
    description:
      "See exactly where to cut, switch, or downgrade — with dollar amounts and reasoning.",
  },
];

const FAQS = [
  {
    q: "Is SpendLens really free?",
    a: "Yes, completely free. No credit card, no login required. We show you the audit results before asking for anything.",
  },
  {
    q: "How accurate are the savings estimates?",
    a: "Very. Every price in our engine is pulled from official vendor pricing pages and verified weekly. We cite our sources — you can check every number.",
  },
  {
    q: "What tools do you support?",
    a: "Cursor, GitHub Copilot, Claude, ChatGPT, Anthropic API, OpenAI API, Gemini, and Windsurf — covering all major AI development and productivity tools.",
  },
  {
    q: "How does Credex help me save even more?",
    a: "Credex sells discounted AI infrastructure credits sourced from companies that overforecast. For high-savings audits, we can connect you with credits at 15–30% below retail.",
  },
  {
    q: "Do you store my data?",
    a: "Your audit is stored to generate a shareable link. We never share identifying details publicly — shared links show tools and savings only, never company names or emails.",
  },
];

function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(value);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    const el = document.getElementById(`counter-${value}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!isVisible) return;

    const numMatch = value.match(/[\d,]+/);
    if (!numMatch) {
      // eslint-disable-next-line
      setDisplay(value);
      return;
    }

    const target = parseInt(numMatch[0].replace(/,/g, ""));
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        clearInterval(timer);
        setDisplay(value);
      } else {
        const formatted = value.replace(
          numMatch[0],
          Math.floor(current).toLocaleString()
        );
        setDisplay(formatted);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value, duration]);

  return (
    <span id={`counter-${value}`} className="tabular-nums">
      {display}
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground pr-4">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 pb-5" : "max-h-0"
        }`}
      >
        <p className="px-5 text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Eye className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Spend<span className="text-primary">Lens</span>
            </span>
          </Link>
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
          >
            Start Audit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 radial-gradient" />

        {/* Floating orbs */}
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[100px] animate-float" />
        <div
          className="absolute bottom-20 right-[10%] w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-8 animate-slide-up">
            <Sparkles className="w-4 h-4" />
            Free AI Spend Audit — No login required
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            Stop Overpaying for
            <br />
            <span className="gradient-text">AI Tools</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            Most teams waste 30–50% on AI subscriptions they don&apos;t need.
            SpendLens audits your stack in 2 minutes — for free.
          </p>

          {/* CTA */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/audit"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] animate-pulse-glow"
            >
              <DollarSign className="w-5 h-5" />
              Audit My AI Spend
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              No signup · No credit card · Takes 2 minutes
            </span>
          </div>

          {/* Tool logos strip */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="text-sm text-muted-foreground mr-2">
              Supports:
            </span>
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-sm"
              >
                <span>{tool.logo}</span>
                <span className="text-muted-foreground">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative py-12 border-y border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Three steps. Two minutes. Real savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="relative glass rounded-2xl p-8 group hover:border-primary/30 transition-all duration-300"
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </div>

                <step.icon className="w-10 h-10 text-primary mb-5 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Your Audit Includes
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Not just numbers — actionable intelligence for your AI budget.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: TrendingDown,
                title: "Per-Tool Savings Breakdown",
                desc: "See exactly how much you can save on each tool — with specific plan recommendations.",
              },
              {
                icon: Zap,
                title: "Smarter Alternatives",
                desc: "Discover cheaper tools that do the same job for your specific use case.",
              },
              {
                icon: Users,
                title: "Right-Sizing Analysis",
                desc: "Find out if you're on a team plan when individual would work, or enterprise when team suffices.",
              },
              {
                icon: Sparkles,
                title: "AI-Powered Summary",
                desc: "A personalized paragraph explaining your audit results in plain English.",
              },
              {
                icon: FileText,
                title: "Shareable Report",
                desc: "Get a unique URL to share with your team or finance — no login needed to view.",
              },
              {
                icon: Shield,
                title: "Credex Credits Access",
                desc: "For high-savings audits, unlock discounted AI credits through Credex at 15–30% off retail.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-5 rounded-xl border border-border/50 hover:border-primary/20 transition-colors duration-300 bg-card/50"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Trusted by Engineering Teams
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "We were paying for Cursor Business for 4 people. SpendLens showed us Pro was enough — saved $960/year.",
                name: "Alex K.",
                role: "CTO, Series A startup",
              },
              {
                quote:
                  "Didn't realize we could switch from ChatGPT Enterprise to Team plan. That's $3,600/year we're getting back.",
                name: "Priya M.",
                role: "Engineering Manager",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="glass rounded-2xl p-6 text-left"
              >
                <p className="text-muted-foreground mb-4 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-6 italic">
            * Testimonials are illustrative examples based on typical audit results.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 radial-gradient" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to find out what you&apos;re{" "}
            <span className="gradient-text">really</span> spending?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join hundreds of teams who&apos;ve already audited their AI stack.
            Free, instant, no strings.
          </p>
          <Link
            href="/audit"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]"
          >
            Start My Free Audit
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Eye className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">
              Spend<span className="text-primary">Lens</span>
            </span>
            <span className="text-xs text-muted-foreground">
              by{" "}
              <a
                href="https://credex.rocks"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Credex
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Credex</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
