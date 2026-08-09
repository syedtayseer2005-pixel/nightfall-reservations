import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";

export const reservationSchema = z.object({
  guest_name: z.string().trim().min(2, "Tell us your name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s()]+$/, "Digits and + - ( ) only"),
  email: z.string().trim().email("Enter a valid email").max(255).or(z.literal("")),
  party_size: z.coerce.number().int().min(1).max(20),
  reservation_date: z.string().min(1, "Pick a date"),
  reservation_time: z.string().min(1, "Pick a time"),
  occasion: z.string().trim().max(60).optional(),
  notes: z.string().trim().max(500, "Keep it under 500 characters").optional(),
});

export type ReservationInput = z.input<typeof reservationSchema>;

export async function createReservation(input: ReservationInput) {
  const parsed = reservationSchema.parse(input);
  const { error } = await supabase.from("reservations").insert({
    guest_name: parsed.guest_name,
    phone: parsed.phone,
    email: parsed.email === "" ? null : parsed.email,
    party_size: parsed.party_size,
    reservation_date: parsed.reservation_date,
    reservation_time: parsed.reservation_time,
    occasion: parsed.occasion || null,
    notes: parsed.notes || null,
    status: "pending",
  });
  if (error) throw new Error(error.message);
}

export const timeSlots = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];

export const occasions = [
  "Just a drink",
  "Birthday",
  "Anniversary",
  "Date night",
  "Work crowd",
  "Celebration",
];

// The bar rests on Tuesdays.
export function isClosed(dateString: string) {
  if (!dateString) return false;
  const day = new Date(`${dateString}T00:00:00`).getDay();
  return day === 2;
}