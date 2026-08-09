import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { LogoLink } from "@/components/Logo";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/story", label: "Story" },
  { to: "/visit", label: "Visit" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/70 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <LogoLink />

        <nav className="hidden items-center gap-9 text-xs font-medium uppercase tracking-[0.22em] md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="link-underline text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/reservation"
            className="border border-primary bg-primary/10 px-5 py-2.5 text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-neon)]"
          >
            Reserve
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="text-foreground md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-t border-border/60 bg-ink/95 backdrop-blur-xl transition-all duration-500 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-transparent",
        )}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-5 py-4 text-sm uppercase tracking-[0.22em]">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="py-3 text-muted-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/reservation"
              onClick={() => setOpen(false)}
              className="mt-2 border border-primary px-5 py-3 text-center text-primary"
            >
              Reserve
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}