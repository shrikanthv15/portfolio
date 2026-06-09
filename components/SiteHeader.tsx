"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/content";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled ? "border-b border-rule bg-paper/80 backdrop-blur" : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a href="#top" className="font-display text-xl font-extrabold tracking-tight">
          SV<span className="text-signal">.</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href={profile.resumeUrl}
          className="rounded-full border border-ink/20 px-4 py-1.5 text-sm transition-colors hover:border-ink"
        >
          Résumé
        </a>
      </div>
    </header>
  );
}
