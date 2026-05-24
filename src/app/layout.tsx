import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://spendlens.com'),
  title: {
    default: "SpendLens — AI Spend Audit Tool",
    template: "%s | SpendLens",
  },
  description:
    "Stop overspending on AI tools. Get a free, instant audit of your AI subscriptions — see exactly where you're wasting money and how to save.",
  keywords: [
    "AI spend audit",
    "AI tool costs",
    "Cursor pricing",
    "ChatGPT costs",
    "Claude pricing",
    "GitHub Copilot pricing",
    "AI budget optimization",
    "Credex",
  ],
  authors: [{ name: "Credex", url: "https://credex.rocks" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "SpendLens",
    title: "SpendLens — Stop Overspending on AI Tools",
    description:
      "Free instant audit of your AI subscriptions. See exactly where you're wasting money.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpendLens — Stop Overspending on AI Tools",
    description:
      "Free instant audit of your AI subscriptions. See exactly where you're wasting money.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
