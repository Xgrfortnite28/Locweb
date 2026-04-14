import { z } from "zod";
import { isValidBookingDate } from "@/lib/booking";

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  service: z.string().trim().min(2).max(100),
  date: z.string().refine((value) => isValidBookingDate(value), {
    message: "Please choose a valid booking date.",
  }),
  window: z.string().trim().min(3).max(60),
  details: z.string().trim().max(1500).default(""),
  website: z.string().trim().max(200).default(""),
});

export type BookingInput = z.infer<typeof bookingSchema>;
