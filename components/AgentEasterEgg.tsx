"use client";

import { useEffect, useState } from "react";

/**
 * Type "kratos" anywhere → the orchestrator wakes up and annotates the page.
 * Keyboard-discoverable, dismissable with Esc, no motion dependency.
 */
export default function AgentEasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let buf = "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key.length === 1) {
        buf = (buf + e.key.toLowerCase()).slice(-6);
        if (buf === "kratos") {
          setOpen(true);
          buf = "";
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-end p-6"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-label="Kratos agent message"
    >
      <div
        className="max-w-sm rounded-xl border border-signal/40 bg-inkdeep p-5 text-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="eyebrow mb-3 flex items-center gap-2 text-signal">
          <span className="inline-flex h-2 w-2 rounded-full bg-signal" />
          kratos online
        </p>
        <p className="font-mono text-sm leading-relaxed text-paper/85">
          You found me. I&apos;m the orchestrator — I route Shrikanth&apos;s goals to the
          agents that scout, write, and ship. He set the intent; we did the rest.
        </p>
        <p className="mt-3 font-mono text-xs text-paper/45">
          This page was assembled by the team. Provenance is the point.
        </p>
        <button
          onClick={() => setOpen(false)}
          className="mt-4 font-mono text-xs text-signal underline underline-offset-2"
        >
          dismiss (esc)
        </button>
      </div>
    </div>
  );
}
