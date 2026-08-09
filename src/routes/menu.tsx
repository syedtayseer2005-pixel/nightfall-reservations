import { createFileRoute, Link } from "@tanstack/react-router";

import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { menuSections } from "@/data/menu";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Cocktails & Small Plates | Oxymorons Hyderabad" },
      {
        name: "description",
        content:
          "Signature cocktails, reworked classics, zero-proof drinks and small plates from the Oxymorons lab in Begumpet, Hyderabad.",
      },
      { property: "og:title", content: "Menu — Cocktails & Small Plates | Oxymorons" },
      {
        property: "og:description",
        content: "Contradictions in a glass: signatures, reworked classics and zero-proof pours.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <div className="pb-24 pt-32">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-primary">The anti-menu</p>
          <h1 className="mt-4 text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl md:text-8xl">
            Drink the
            <span className="block text-outline">contradiction</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            No hundred-item overload, no forced pairing of food and drink. A tight, rotating list
            built like a lab experiment — every pour and plate earns its spot on purpose.
          </p>
        </Reveal>
      </section>

      <Marquee text="Lab by day · Bar by night" className="mt-16" />

      <section className="mx-auto max-w-7xl space-y-24 px-5 pt-20 sm:px-8">
        {menuSections.map((section, sectionIndex) => (
          <div key={section.id} className="grid gap-10 md:grid-cols-[280px_1fr]">
            <Reveal variant="left" className="min-w-0 md:sticky md:top-28 md:self-start">
              <p className="font-display text-xs uppercase tracking-[0.3em] text-primary">
                0{sectionIndex + 1}
              </p>
              <h2 className="mt-3 break-words text-3xl font-extrabold uppercase leading-none sm:text-4xl">
                {section.title}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">{section.blurb}</p>
            </Reveal>

            <ul className="divide-y divide-border/60 border-y border-border/60">
              {section.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.name}
                  delay={i * 60}
                  className="group px-1 py-6 transition-colors hover:bg-card/60"
                >
                  <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-bold uppercase tracking-tight transition-colors group-hover:text-primary">
                    <span>{item.name}</span>
                    {item.tag ? (
                      <span className="inline-flex items-center border border-accent/50 px-2 py-0.5 font-body text-[10px] uppercase tracking-[0.2em] text-accent">
                        {item.tag}
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.notes}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8">
        <Reveal variant="scale" className="border border-border/70 bg-card/50 p-10 text-center">
          <h2 className="text-3xl font-extrabold uppercase sm:text-5xl">Seats are few. Book one.</h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            750 sq. ft. means the room fills fast. Reserve before you arrive.
          </p>
          <Link
            to="/reservation"
            className="mt-8 inline-block border border-primary bg-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-shadow duration-300 hover:shadow-[var(--shadow-neon)]"
          >
            Reserve a table
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
