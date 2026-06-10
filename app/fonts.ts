import localFont from "next/font/local";
import { Geist_Mono, Caveat } from "next/font/google";

/**
 * Type system.
 * - Display: Clash Display (Fontshare, self-hosted) — bold, smooth, premium editorial.
 * - Body: Satoshi (Fontshare, self-hosted) — clean neutral sans.
 * - Mono: Geist Mono (labels, code, terminal).
 * - Hand: Caveat — the handwritten project notes.
 * All self-hosted/build-time (next/font) so nothing depends on a runtime CDN.
 */
export const display = localFont({
  src: [
    { path: "./fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashDisplay-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--ff-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const body = localFont({
  src: [
    { path: "./fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--ff-body",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--ff-mono",
  display: "swap",
});

export const hand = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--ff-hand",
  display: "swap",
});
