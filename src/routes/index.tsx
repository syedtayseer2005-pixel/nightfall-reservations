import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { OxMark } from "@/components/Logo";
import { menuSections } from "@/data/menu";
import heroBar from "@/assets/hero-bar.jpg";
import cocktailLab from "@/assets/cocktail-lab.jpg";
import bookshelf from "@/assets/bookshelf-door.jpg";
import crowd from "@/assets/crowd.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oxymorons — Cocktail Lab & Hidden Bar in Begumpet, Hyderabad" },
      {
        name: "description",
        content:
          "A 750 sq. ft. premium cocktail bar behind a bookshelf in Begumpet, Hyderabad. Lab by day, bar by night. Reserve your seat online.",
      },
      { property: "og:title", content: "Oxymorons — Lab by Day, Bar by Night" },
      {
        property: "og:description",
        content:
          "Hyderabad's hidden cocktail lab in Begumpet. Signature drinks built on contradictions. Book a table.",
      },
    ],
  }),
  component: Index,
});

const signatures = menuSections[0]?.items.slice(0, 3) ?? [];

function Index() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-svh items-end overflow-hidden grain">
        <img
          src={heroBar}
          alt="The red-lit bar of Oxymorons at night"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          style={{ transform: `translateY(${offset * 0.18}px) scale(1.1)` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/35 to-background/70" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-40 sm:px-8">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-primary">
              Begumpet · Hyderabad
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 text-[15vw] font-extrabold uppercase leading-[0.82] tracking-[-0.05em] sm:text-[11vw]">
              <span className="block">Oxy</span>
              <span className="block text-outline">morons</span>
            </h1>
          </Reveal>
          <Reveal delay={260} className="mt-8 flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              noun /Ox–ee–more–ons/ — a premium cocktail bar built on contradictions. Tucked behind
              a bookshelf. Small, sharp, deliberate.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/reservation"
                className="border border-primary bg-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-shadow duration-300 hover:shadow-[var(--shadow-neon)]"
              >
                Reserve a table
              </Link>
              <Link
                to="/menu"
                className="border border-border px-8 py-4 text-xs uppercase tracking-[0.24em] text-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                See the menu
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            <ArrowDown className="h-4 w-4 animate-bounce text-primary" /> Scroll
          </div>
        </div>
      </section>

      <Marquee text="Lab by day · Bar by night" />

      {/* Manifesto */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <div className="grid gap-14 md:grid-cols-[1.1fr_1fr]">
          <Reveal variant="left">
            <h2 className="text-4xl font-extrabold uppercase leading-[0.95] sm:text-6xl">
              Not as serious as it sounds.
              <span className="block text-primary">Not as silly as it looks.</span>
            </h2>
            <p className="mt-8 max-w-lg text-muted-foreground">
              We believe opposing forces create unexpected harmony. In a city that celebrates scale,
              we chose intimacy: 750 sq. ft., a high-performance bar and a 15 sq. ft. kitchenette.
            </p>
            <Link
              to="/story"
              className="link-underline mt-8 inline-block text-xs uppercase tracking-[0.28em] text-accent"
            >
              Read the full story
            </Link>
          </Reveal>

          <Reveal variant="right" className="relative">
            <img
              src={cocktailLab}
              alt="A smoking signature cocktail beside laboratory glassware"
              width={1200}
              height={1504}
              loading="lazy"
              className="h-[28rem] w-full object-cover"
            />
            <OxMark className="animate-spin-slow absolute -left-6 -top-6 h-16 w-16 text-primary" />
          </Reveal>
        </div>
      </section>

      {/* Signatures */}
      <section className="border-y border-border/60 bg-ink/50 py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl font-extrabold uppercase sm:text-6xl">Tonight&apos;s pours</h2>
            <Link
              to="/menu"
              className="link-underline text-xs uppercase tracking-[0.28em] text-muted-foreground"
            >
              Full menu
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-px bg-border/60 md:grid-cols-3">
            {signatures.map((item, i) => (
              <Reveal
                key={item.name}
                delay={i * 120}
                className="group bg-background p-10 transition-colors duration-500 hover:bg-card"
              >
                <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-2xl font-extrabold uppercase transition-transform duration-500 group-hover:translate-x-1">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{item.notes}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <Reveal>
          <h2 className="text-4xl font-extrabold uppercase sm:text-6xl">The room</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Reveal variant="left" className="md:col-span-2">
            <div className="overflow-hidden">
              <img
                src={crowd}
                alt="Guests laughing inside the red-lit room at Oxymorons"
                width={1200}
                height={912}
                loading="lazy"
                className="h-96 w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal variant="right" delay={150}>
            <div className="overflow-hidden">
              <img
                src={bookshelf}
                alt="The bookshelf door hiding the entrance"
                width={1200}
                height={912}
                loading="lazy"
                className="h-96 w-full object-cover transition-transform duration-[1200ms] hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee text="Contradiction isn't chaos. It's chemistry." reverse />

      {/* Reserve CTA */}
      <section className="mx-auto max-w-7xl px-5 py-28 text-center sm:px-8">
        <Reveal variant="scale">
          <h2 className="text-5xl font-extrabold uppercase leading-[0.9] sm:text-8xl">
            Book the
            <span className="block text-outline">bookshelf</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            Open Wednesday to Monday from 5 PM. Closed Tuesdays — we rest, reset and rethink
            cocktails.
          </p>
          <Link
            to="/reservation"
            className="mt-10 inline-block border border-primary bg-primary px-10 py-5 text-xs uppercase tracking-[0.28em] text-primary-foreground transition-shadow duration-300 hover:shadow-[var(--shadow-neon)]"
          >
            Reserve now
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
