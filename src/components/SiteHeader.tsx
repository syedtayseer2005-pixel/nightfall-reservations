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

  // Lock the page in place while the mobile menu is open so a stray touch
  // can't scroll the background and shift the fixed header out of view.
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        window.scrollTo(0, scrollY);
      };
    }
    return undefined;
  }, [open]);

  const closeAndGo = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
        scrolled || open
          ? "border-b border-border/70 bg-ink/95 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <LogoLink onClick={closeAndGo} />

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
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-[110] -m-2 p-2 text-foreground md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-[64px] bottom-0 z-[90] overflow-y-auto border-t border-border/60 bg-ink/98 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1 px-5 py-6 text-base uppercase tracking-[0.22em]">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeAndGo}
                className="border-b border-border/40 py-4 text-muted-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/reservation"
              onClick={closeAndGo}
              className="mt-6 border border-primary bg-primary px-5 py-4 text-center text-primary-foreground"
            >
              Reserve
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
