"use client";

import { useEffect, useRef } from "react";
import type { TourMessage } from "./useDialogueTour";

/**
 * Docked, non-modal chat thread for Kratos's tour. role="log" + aria-live so
 * each line is announced politely; never traps focus or blocks the page.
 * Autoscrolls to newest only if the reader is already near the bottom.
 */
export default function CompanionThread({
  status,
  messages,
  typing,
  onDismiss,
  onReplay,
  onSkip,
}: {
  status: "idle" | "touring";
  messages: TourMessage[];
  typing: boolean;
  onDismiss: () => void;
  onReplay: () => void;
  onSkip: () => void;
}) {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    if (nearBottom) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    if (status !== "touring") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, onDismiss]);

  if (status !== "touring") return null;

  return (
    <div className="ktour" role="region" aria-label="Kratos is giving you a guided tour">
      <span className="ktour__name">▸ Kratos</span>
      <div className="ktour__log" role="log" aria-live="polite" aria-atomic="false" ref={logRef}>
        {messages.map((m) => (
          <div key={m.id} className="ktour__msg">
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="ktour__msg ktour__typing" aria-label="Kratos is typing">
            <i />
            <i />
            <i />
          </div>
        )}
      </div>
      <div className="ktour__controls">
        <button className="ktour__btn" type="button" onClick={onSkip}>
          skip
        </button>
        <button className="ktour__btn" type="button" onClick={onReplay}>
          replay
        </button>
        <button className="ktour__btn" type="button" onClick={onDismiss} aria-label="Dismiss Kratos">
          close ✕
        </button>
      </div>
    </div>
  );
}
