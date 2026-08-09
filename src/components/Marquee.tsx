import { cn } from "@/lib/utils";

export function Marquee({
  text,
  reverse = false,
  className,
}: {
  text: string;
  reverse?: boolean;
  className?: string;
}) {
  const items = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div
      className={cn(
        "relative flex overflow-hidden border-y border-border/60 bg-ink/60 py-4 select-none",
        className,
      )}
    >
      <div
        className={cn(
          "flex min-w-max shrink-0 items-center gap-8 pr-8",
          reverse ? "animate-marquee-rev" : "animate-marquee",
        )}
      >
        {items.map((i) => (
          <span
            key={i}
            className="font-display text-xl font-extrabold uppercase tracking-tight sm:text-3xl"
          >
            {text}
            <span className="ml-8 text-primary">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}