import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone } from "lucide-react";

import { OxMark, Wordmark } from "@/components/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-ink/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <OxMark className="animate-spin-slow h-8 w-8 text-primary" />
            <Wordmark className="text-3xl" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A 750 sq. ft. cocktail lab behind a bookshelf in Begumpet. Lab by day, bar by night.
          </p>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="font-display text-xs uppercase tracking-[0.28em] text-foreground">Hours</p>
          <p>Wed – Thu, Sun · 5 PM – 12 AM</p>
          <p>Fri – Sat · 5 PM – 1 AM</p>
          <p>Monday · reset &amp; rethink</p>
          <p className="text-primary">Tuesday · closed</p>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <p className="font-display text-xs uppercase tracking-[0.28em] text-foreground">Find us</p>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            Begumpet, Hyderabad
          </p>
          <a href="tel:+919000000000" className="link-underline flex items-center gap-2">
            <Phone className="h-4 w-4 text-primary" /> +91 90000 00000
          </a>
          <a
            href="https://www.instagram.com/oxymorons.hyd"
            target="_blank"
            rel="noreferrer"
            className="link-underline flex items-center gap-2"
          >
            <Instagram className="h-4 w-4 text-primary" /> @oxymorons.hyd
          </a>
          <Link to="/reservation" className="link-underline inline-block pt-2 text-foreground">
            Book a seat →
          </Link>
        </div>
      </div>

      <div className="border-t border-border/60 px-5 py-6 text-center text-xs uppercase tracking-[0.24em] text-muted-foreground sm:px-8">
        © {new Date().getFullYear()} Oxymorons · Drink responsibly
      </div>
    </footer>
  );
}