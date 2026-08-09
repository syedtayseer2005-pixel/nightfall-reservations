import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export function OxMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="square">
        <circle cx="22" cy="24" r="13" />
        <path d="M40 12 L58 40 M58 12 L40 40" />
        <path d="M10 52 L54 52" strokeWidth="4" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-2xl font-extrabold uppercase leading-none tracking-[-0.06em]",
        className,
      )}
    >
      Oxy
      <span className="inline-block -skew-x-12 text-primary">m</span>
      <span className="inline-block skew-y-6">o</span>
      <span className="inline-block -skew-y-6">r</span>
      on
      <span className="inline-block -skew-x-12 text-accent">s</span>
    </span>
  );
}

export function LogoLink({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Oxymorons home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <OxMark className="h-7 w-7 text-primary transition-transform duration-500 group-hover:rotate-180" />
      <Wordmark />
    </Link>
  );
}