import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, Phone } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import bookshelf from "@/assets/bookshelf-door.jpg";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit & Contact — Begumpet, Hyderabad | Oxymorons" },
      {
        name: "description",
        content:
          "Hours, location and contact for Oxymorons cocktail bar in Begumpet, Hyderabad. Open Wednesday to Monday from 5 PM. Closed Tuesdays.",
      },
      { property: "og:title", content: "Visit Oxymorons — Begumpet, Hyderabad" },
      {
        property: "og:description",
        content: "Hours, location and how to find the bookshelf door.",
      },
    ],
  }),
  component: VisitPage,
});

const hours = [
  { day: "Monday", time: "We reset and rethink signature drinks" },
  { day: "Tuesday", time: "Closed — see you Wednesday" },
  { day: "Wednesday – Thursday", time: "5 PM – 12 AM" },
  { day: "Friday – Saturday", time: "5 PM – 1 AM" },
  { day: "Sunday", time: "5 PM – 12 AM" },
];

function VisitPage() {
  return (
    <div className="pb-24 pt-32">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-primary">Find the door</p>
          <h1 className="mt-4 text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl">
            Visit the
            <span className="block text-outline">bookshelf</span>
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <Reveal variant="left" className="space-y-10">
            <div>
              <h2 className="flex items-center gap-3 text-xl font-extrabold uppercase">
                <Clock className="h-5 w-5 text-primary" /> Hours
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                We open at 5 PM — but we&apos;re brewing magic all day behind the scenes.
              </p>
              <ul className="mt-6 divide-y divide-border/60 border-y border-border/60">
                {hours.map((h) => (
                  <li key={h.day} className="flex flex-wrap justify-between gap-3 py-4 text-sm">
                    <span className="font-display uppercase tracking-wide">{h.day}</span>
                    <span className="text-muted-foreground">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 text-sm">
              <h2 className="text-xl font-extrabold uppercase">Reach us</h2>
              <p className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Begumpet, Hyderabad, Telangana 500016
              </p>
              <a
                href="tel:+919000000000"
                className="link-underline flex w-fit items-center gap-3 text-muted-foreground"
              >
                <Phone className="h-4 w-4 text-primary" /> +91 90000 00000
              </a>
              <a
                href="https://www.instagram.com/oxymorons.hyd"
                target="_blank"
                rel="noreferrer"
                className="link-underline flex w-fit items-center gap-3 text-muted-foreground"
              >
                <Instagram className="h-4 w-4 text-primary" /> @oxymorons.hyd
              </a>
              <Link
                to="/reservation"
                className="mt-4 inline-block border border-primary bg-primary/10 px-7 py-3.5 text-xs uppercase tracking-[0.24em] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[var(--shadow-neon)]"
              >
                Reserve a table
              </Link>
            </div>
          </Reveal>

          <Reveal variant="right" className="space-y-6">
            <img
              src={bookshelf}
              alt="The hidden bookshelf entrance to Oxymorons"
              width={1200}
              height={912}
              loading="lazy"
              className="h-72 w-full object-cover"
            />
            <div className="overflow-hidden border border-border/60">
              <iframe
                title="Map to Oxymorons in Begumpet, Hyderabad"
                src="https://www.google.com/maps?q=Begumpet,Hyderabad&output=embed"
                className="h-80 w-full grayscale contrast-125 transition-all duration-700 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}