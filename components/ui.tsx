import type { ReactNode } from "react";
import Decrypt from "@/components/Decrypt";

/**
 * Shared editorial primitives. Every "Field Note" section is built from these
 * so spacing, rhythm, and type stay deliberate and consistent.
 */

export function SectionShell({
  id,
  children,
  className = "",
  inverted = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <section
      id={id}
      className={[
        "relative scroll-mt-24 px-6 sm:px-10 lg:px-16",
        inverted ? "bg-inkdeep text-paper" : "",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden
        className={[
          "section-rule absolute left-6 right-6 top-0 h-px origin-left sm:left-10 sm:right-10 lg:left-16 lg:right-16",
          inverted ? "bg-paper/15" : "bg-rule",
        ].join(" ")}
      />
      <div className="mx-auto w-full max-w-6xl">
        {children}
      </div>
    </section>
  );
}

/** Mono eyebrow like a printed field-journal label: "FIELD NOTE 03 — WORK" */
export function FieldLabel({
  children,
  inverted = false,
}: {
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <p
      className={[
        "eyebrow mb-6 flex items-center gap-3",
        inverted ? "text-paper/60" : "",
      ].join(" ")}
    >
      <span
        aria-hidden
        className={[
          "fl-rule h-px w-8",
          inverted ? "bg-paper/30" : "bg-rule",
        ].join(" ")}
      />
      {typeof children === "string" ? <Decrypt text={children} /> : children}
    </p>
  );
}

/** Small mono chip for stack tags / metadata. */
export function Tag({
  children,
  inverted = false,
}: {
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <span
      className={[
        "inline-block rounded-full border px-2.5 py-1 font-mono text-[0.68rem] tracking-wide",
        inverted
          ? "border-paper/25 text-paper/75"
          : "border-rule text-muted",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
