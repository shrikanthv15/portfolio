"use client";

/**
 * Centralized GSAP registration. ScrollTrigger drives all scrubbed/pinned
 * scroll choreography; SplitText powers kinetic headline reveals.
 * gsap 3.13+ ships these plugins free — no Club license needed.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let registered = false;

export function registerGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    registered = true;
  }
  return { gsap, ScrollTrigger, SplitText };
}

/** True when the visitor asked for less motion — every scene must honor this. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** "Expensive" easing curves — the Apple/PS5 feel. */
export const EASE = {
  // smooth, slightly weighted out — product-page zoom
  expo: "expo.out",
  // gentle overshoot for type/headline entrances
  overshoot: "back.out(1.6)",
  // custom cubic-bezier used across CSS too
  signature: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export { gsap, ScrollTrigger, SplitText };
