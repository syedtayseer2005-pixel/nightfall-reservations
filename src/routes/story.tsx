import { createFileRoute } from "@tanstack/react-router";

import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import bookshelf from "@/assets/bookshelf-door.jpg";
import cocktailLab from "@/assets/cocktail-lab.jpg";
import crowd from "@/assets/crowd.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — A Cocktail Lab Behind a Bookshelf | Oxymorons" },
      {
        name: "description",
        content:
          "Oxymorons is a 750 sq. ft. premium cocktail bar in Begumpet, Hyderabad — built on contradictions, run like a lab, hidden behind a bookshelf.",
      },
      { property: "og:title", content: "Our Story | Oxymorons Hyderabad" },
      {
        property: "og:description",
        content: "Born from tension, run like a lab. The story behind the bookshelf door.",
      },
    ],
  }),
  component: StoryPage,
});

const principles = [
  {
    title: "No hierarchy",
    body: "Everyone experiments, everyone contributes. The best idea wins, whoever brought it.",
  },
  {
    title: "Small on purpose",
    body: "750 sq. ft. In a city obsessed with scale, we chose intimacy and got louder for it.",
  },
  {
    title: "Technique over theatre",
    body: "Clarifications, fat-washes, ferments. The drama is in the flavour, not the smoke machine.",
  },
  {
    title: "Low ego, bold flavour",
    body: "We challenge norms to ask better questions — not to be difficult about it.",
  },
];

function StoryPage() {
  return (
    <div className="pb-24 pt-32">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-primary">noun /Ox–ee–more–ons/</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl">
            Not as serious as it sounds.
            <span className="block text-outline">Not as silly as it looks.</span>
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <Reveal variant="left" className="space-y-5 text-muted-foreground">
            <p>
              Oxymorons is a premium cocktail bar built on contradictions — and that&apos;s exactly
              the point. Tucked behind a bookshelf in Begumpet, it&apos;s small, sharp and
              deliberate. Born from tension, run like a lab, and far more than the bar with good
              ambience you thought you were walking into.
            </p>
            <p>
              We believe opposing forces create unexpected harmony. So we packed a high-performance
              cocktail bar and a 15 sq. ft. kitchenette into 750 sq. ft. — proof that you don&apos;t
              need size to make an impact.
            </p>
            <p>
              We&apos;re not chasing &ldquo;cocktail bar near me&rdquo;. We&apos;re gunning for
              &ldquo;my favourite spot to unwind&rdquo;. Because we&apos;re not building a menu.
              We&apos;re building a culture. And contradiction isn&apos;t chaos — it&apos;s
              chemistry.
            </p>
          </Reveal>

          <Reveal variant="right" className="relative">
            <img
              src={cocktailLab}
              alt="A smoking craft cocktail on a dark lab bench surrounded by beakers"
              width={1200}
              height={1504}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/30" />
          </Reveal>
        </div>
      </section>

      <Marquee text="Contradiction isn't chaos. It's chemistry." reverse className="mt-24" />

      <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-8">
        <div className="grid gap-px border border-border/60 bg-border/60 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 90}
              className="group bg-background p-10 transition-colors duration-500 hover:bg-card"
            >
              <span className="font-display text-xs uppercase tracking-[0.3em] text-primary">
                0{i + 1}
              </span>
              <h2 className="mt-4 text-2xl font-extrabold uppercase">{p.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pt-24 sm:px-8 md:grid-cols-2">
        <Reveal variant="left">
          <img
            src={bookshelf}
            alt="Hidden bar entrance behind a bookshelf door with red light spilling out"
            width={1200}
            height={912}
            loading="lazy"
            className="h-80 w-full object-cover"
          />
        </Reveal>
        <Reveal variant="right" delay={120}>
          <img
            src={crowd}
            alt="Guests laughing together inside the red-lit cocktail bar"
            width={1200}
            height={912}
            loading="lazy"
            className="h-80 w-full object-cover"
          />
        </Reveal>
      </section>
    </div>
  );
}