export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="animate-drift absolute -left-1/4 top-[-20%] h-[70vh] w-[70vh] rounded-full bg-primary/25 blur-[120px]" />
      <div className="animate-drift-slow absolute -right-1/4 top-[30%] h-[60vh] w-[60vh] rounded-full bg-accent/12 blur-[140px]" />
      <div className="animate-pulse-glow absolute bottom-[-25%] left-1/3 h-[60vh] w-[60vh] rounded-full bg-primary/15 blur-[150px]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          color: "var(--muted-foreground)",
        }}
      />
    </div>
  );
}