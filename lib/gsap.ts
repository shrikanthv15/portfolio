"use client";

/**
 * Centralized GSAP registration. ScrollTrigger drives scrubbed/pinned scroll;
 * SplitText powers kinetic headline reveals; ScrambleText powers decrypt/typing
 * effects; DrawSVG is available for editorial line work. gsap 3.13+ ships all
 * of these free — no Club license needed.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

let registered = false;

export function registerGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(
      ScrollTrigger,
      SplitText,
      ScrambleTextPlugin,
      TextPlugin,
      DrawSVGPlugin
    );
    registered = true;
  }
  return { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin };
}

/** True when the visitor asked for less motion — every scene must honor this. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** True on touch / coarse-pointer devices — disable cursor + magnetism. */
export function isCoarsePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  );
}

/** "Expensive" easing curves — the Apple/PS5 feel. */
export const EASE = {
  expo: "expo.out",
  overshoot: "back.out(1.6)",
  signature: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export { gsap, ScrollTrigger, SplitText, ScrambleTextPlugin, TextPlugin, DrawSVGPlugin };
