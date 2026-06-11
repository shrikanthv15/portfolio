import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { display, body, mono } from "./fonts";
import { profile } from "@/lib/content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-nine-gules-47.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${profile.name} — ${profile.role}`,
  description:
    "AI/ML engineer who architects and commands a live multi-agent system in production. An AI built this site. I built the AI.",
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description:
      "AI/ML engineer who architects and commands a live multi-agent system in production.",
    url: SITE_URL,
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: "An AI built this site. I built the AI.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  sameAs: [profile.github, profile.linkedin],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Maryland, College Park" },
    { "@type": "CollegeOrUniversity", name: "IIT Madras" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="grain min-h-dvh">
        <div className="scroll-progress" aria-hidden />
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
