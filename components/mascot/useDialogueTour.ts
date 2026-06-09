"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TOUR, TOUR_ORDER, type Beat } from "./dialogue.config";
import { prefersReducedMotion } from "@/lib/gsap";

export type TourMessage = Beat & { sectionKey: string };

/**
 * Tour state machine: click the pet → start() reveals the intro beats; each new
 * section scrolled into view pushes its beats once (high-water-mark). Beats are
 * paced through a queue (typing indicator → reveal). Dismiss keeps the thread
 * resumable; skip flushes everything; replay resets. Reduced-motion = instant.
 */
export function useDialogueTour() {
  const [status, setStatus] = useState<"idle" | "touring">("idle");
  const [messages, setMessages] = useState<TourMessage[]>([]);
  const [typing, setTyping] = useState(false);

  const seen = useRef<Set<string>>(new Set());
  const queue = useRef<TourMessage[]>([]);
  const processing = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const drain = useCallback(() => {
    if (processing.current) return;
    const next = queue.current.shift();
    if (!next) {
      setTyping(false);
      return;
    }
    processing.current = true;
    const reduce = prefersReducedMotion();
    setTyping(!reduce);
    const t1 = window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, next]);
      const t2 = window.setTimeout(() => {
        processing.current = false;
        drain();
      }, reduce ? 0 : 460);
      timers.current.push(t2);
    }, reduce ? 0 : next.typingMs ?? 720);
    timers.current.push(t1);
  }, []);

  const enqueue = useCallback(
    (key: string) => {
      const beats = TOUR[key];
      if (!beats) return;
      queue.current.push(...beats.map((b) => ({ ...b, sectionKey: key })));
      drain();
    },
    [drain]
  );

  const start = useCallback(() => {
    setStatus("touring");
    if (!seen.current.has("top")) {
      seen.current.add("top");
      enqueue("top");
    }
  }, [enqueue]);

  const pushSection = useCallback(
    (key: string) => {
      if (!seen.current.size) return; // tour not started yet
      const idx = TOUR_ORDER.indexOf(key);
      if (idx < 0) {
        if (!seen.current.has(key)) {
          seen.current.add(key);
          enqueue(key);
        }
        return;
      }
      // back-fill any earlier sections skipped by fast scrolling, in order,
      // so the monologue stays coherent regardless of scroll speed.
      for (let i = 0; i <= idx; i++) {
        const k = TOUR_ORDER[i];
        if (!seen.current.has(k)) {
          seen.current.add(k);
          enqueue(k);
        }
      }
    },
    [enqueue]
  );

  const dismiss = useCallback(() => {
    clearTimers();
    queue.current = [];
    processing.current = false;
    setTyping(false);
    setStatus("idle");
  }, []);

  const replay = useCallback(() => {
    clearTimers();
    queue.current = [];
    processing.current = false;
    setTyping(false);
    seen.current = new Set();
    setMessages([]);
    setStatus("touring");
    seen.current.add("top");
    enqueue("top");
  }, [enqueue]);

  const skip = useCallback(() => {
    clearTimers();
    processing.current = false;
    setTyping(false);
    const flush: TourMessage[] = [...queue.current];
    queue.current = [];
    for (const key of TOUR_ORDER) {
      if (!seen.current.has(key)) {
        seen.current.add(key);
        flush.push(...(TOUR[key] ?? []).map((b) => ({ ...b, sectionKey: key })));
      }
    }
    setMessages((m) => [...m, ...flush]);
  }, []);

  useEffect(() => () => clearTimers(), []);

  return { status, messages, typing, start, pushSection, dismiss, replay, skip };
}
