import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import {
  createReservation,
  isClosed,
  occasions,
  reservationSchema,
  timeSlots,
  type ReservationInput,
} from "@/lib/reservations";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Reserve a Table — Oxymorons Cocktail Bar, Hyderabad" },
      {
        name: "description",
        content:
          "Book your seat behind the bookshelf at Oxymorons, Begumpet. Pick a date, time and party size — we confirm within a few hours.",
      },
      { property: "og:title", content: "Reserve a Table | Oxymorons Hyderabad" },
      {
        property: "og:description",
        content: "750 sq. ft. fills fast. Book your seat behind the bookshelf.",
      },
    ],
  }),
  component: ReservationPage,
});

const emptyForm: ReservationInput = {
  guest_name: "",
  phone: "",
  email: "",
  party_size: 2,
  reservation_date: "",
  reservation_time: "20:00",
  occasion: "Just a drink",
  notes: "",
};

const fieldClass =
  "w-full border border-input bg-ink/60 px-4 py-3.5 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/70 focus:border-primary";
const labelClass = "block text-[11px] uppercase tracking-[0.24em] text-muted-foreground";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function ReservationPage() {
  const [form, setForm] = useState<ReservationInput>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (key: keyof ReservationInput, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = reservationSchema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of (result.error as z.ZodError).issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Check the highlighted fields");
      return;
    }
    if (isClosed(form.reservation_date)) {
      setErrors({ reservation_date: "We rest on Tuesdays — pick another night" });
      return;
    }

    setSubmitting(true);
    try {
      await createReservation(form);
      setDone(true);
      toast.success("Reservation requested");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pb-24 pt-32">
      <section className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-primary">Reservations</p>
          <h1 className="mt-4 text-5xl font-extrabold uppercase leading-[0.9] sm:text-7xl">
            Hold a seat
            <span className="block text-outline">behind the shelf</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Tables are held for 15 minutes past your slot. We confirm every request by phone or
            email — usually within a couple of hours.
          </p>
        </Reveal>
      </section>

      <Marquee text="Reserve · Arrive · Disagree pleasantly" className="mt-14" />

      <section className="mx-auto mt-16 max-w-3xl px-5 sm:px-8">
        {done ? (
          <Reveal
            variant="scale"
            className="border border-accent/40 bg-card/60 p-12 text-center grain"
          >
            <CheckCircle2 className="mx-auto h-12 w-12 text-accent" />
            <h2 className="mt-6 text-3xl font-extrabold uppercase">Request received</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
              Thanks, {form.guest_name.split(" ")[0]}. We&apos;ve got you down for{" "}
              {form.party_size} on {form.reservation_date} at {form.reservation_time}. We&apos;ll
              confirm on {form.phone} shortly.
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(emptyForm);
                setDone(false);
              }}
              className="mt-8 border border-border px-7 py-3 text-xs uppercase tracking-[0.24em] transition-colors hover:border-primary hover:text-primary"
            >
              Book another
            </button>
          </Reveal>
        ) : (
          <Reveal
            as="form"
            variant="scale"
            className="space-y-6 border border-border/70 bg-card/40 p-6 backdrop-blur-sm sm:p-10"
            // @ts-expect-error form props pass through the polymorphic wrapper
            onSubmit={onSubmit}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="guest_name">
                  Name
                </label>
                <input
                  id="guest_name"
                  className={cn(fieldClass, "mt-2", errors["guest_name"] && "border-destructive")}
                  value={form.guest_name}
                  maxLength={100}
                  onChange={(e) => update("guest_name", e.target.value)}
                  placeholder="Who's coming?"
                />
                <FieldError message={errors["guest_name"]} />
              </div>

              <div>
                <label className={labelClass} htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  inputMode="tel"
                  className={cn(fieldClass, "mt-2", errors["phone"] && "border-destructive")}
                  value={form.phone}
                  maxLength={20}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 90000 00000"
                />
                <FieldError message={errors["phone"]} />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="email">
                  Email <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={cn(fieldClass, "mt-2", errors["email"] && "border-destructive")}
                  value={form.email}
                  maxLength={255}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                />
                <FieldError message={errors["email"]} />
              </div>

              <div>
                <label className={labelClass} htmlFor="reservation_date">
                  Date
                </label>
                <input
                  id="reservation_date"
                  type="date"
                  min={todayISO()}
                  className={cn(
                    fieldClass,
                    "mt-2",
                    errors["reservation_date"] && "border-destructive",
                  )}
                  value={form.reservation_date}
                  onChange={(e) => update("reservation_date", e.target.value)}
                />
                <FieldError message={errors["reservation_date"]} />
              </div>

              <div>
                <label className={labelClass} htmlFor="party_size">
                  Guests
                </label>
                <div className="mt-2 flex items-center border border-input bg-ink/60">
                  <button
                    type="button"
                    aria-label="Fewer guests"
                    className="px-4 py-3 text-lg text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => update("party_size", Math.max(1, Number(form.party_size) - 1))}
                  >
                    −
                  </button>
                  <span
                    id="party_size"
                    className="flex-1 text-center font-display text-lg font-bold"
                  >
                    {form.party_size}
                  </span>
                  <button
                    type="button"
                    aria-label="More guests"
                    className="px-4 py-3 text-lg text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => update("party_size", Math.min(20, Number(form.party_size) + 1))}
                  >
                    +
                  </button>
                </div>
                <FieldError message={errors["party_size"]} />
              </div>
            </div>

            <div>
              <span className={labelClass}>Time</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => update("reservation_time", slot)}
                    className={cn(
                      "border px-3.5 py-2 text-xs tracking-widest transition-all duration-300",
                      form.reservation_time === slot
                        ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-neon)]"
                        : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className={labelClass}>Occasion</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {occasions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => update("occasion", item)}
                    className={cn(
                      "border px-3.5 py-2 text-xs uppercase tracking-widest transition-all duration-300",
                      form.occasion === item
                        ? "border-accent text-accent"
                        : "border-border text-muted-foreground hover:border-accent/60",
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="notes">
                Anything we should know?
              </label>
              <textarea
                id="notes"
                rows={4}
                maxLength={500}
                className={cn(fieldClass, "mt-2 resize-none")}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Allergies, surprises, a drink you hate..."
              />
              <FieldError message={errors["notes"]} />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-3 border border-primary bg-primary px-8 py-4 text-xs uppercase tracking-[0.28em] text-primary-foreground transition-all duration-300 hover:shadow-[var(--shadow-neon)] disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {submitting ? "Sending" : "Request reservation"}
            </button>

            <p className="text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Closed Tuesdays · Groups over 8, call us
            </p>
          </Reveal>
        )}
      </section>
    </div>
  );
}

function FieldError({ message }: { message?: string | undefined }) {
  if (!message) return null;
  return <p className="mt-2 text-xs text-destructive">{message}</p>;
}