CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  party_size INTEGER NOT NULL DEFAULT 2,
  reservation_date DATE NOT NULL,
  reservation_time TEXT NOT NULL,
  occasion TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.reservations TO anon;
GRANT INSERT ON public.reservations TO authenticated;
GRANT ALL ON public.reservations TO service_role;

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can request a reservation"
  ON public.reservations FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(guest_name) BETWEEN 1 AND 100
    AND length(phone) BETWEEN 5 AND 20
    AND (email IS NULL OR length(email) <= 255)
    AND party_size BETWEEN 1 AND 20
    AND reservation_date >= CURRENT_DATE - 1
    AND length(reservation_time) <= 10
    AND (occasion IS NULL OR length(occasion) <= 60)
    AND (notes IS NULL OR length(notes) <= 500)
    AND status = 'pending'
  );