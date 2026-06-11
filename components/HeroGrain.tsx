"use client";

import { GrainGradient } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

/**
 * The single "3D" moment: a faintly-breathing grain-gradient wash behind the
 * hero — paper-toned, no object, no perspective. Reads as premium printed
 * paper with living texture, not an "AI 3D blob". Static (speed 0) under
 * reduced-motion or low-power. Dynamically imported (ssr:false) so it never
 * blocks first paint; a CSS gradient sits underneath as the always-on fallback.
 */
export default function HeroGrain() {
  const [still, setStill] = useState(true); // assume static until we confirm capability

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
      setStill(reduce || lowPower);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GrainGradient
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      colors={["#f6f3ec", "#efe9dd", "#e3dccb"]}
      colorBack="#f4f1e9"
      softness={0.92}
      intensity={0.1}
      noise={0.32}
      shape="wave"
      speed={still ? 0 : 0.07}
    />
  );
}
