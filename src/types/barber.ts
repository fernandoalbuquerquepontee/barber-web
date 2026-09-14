import type z from "zod";

import type { createAppointmentSchema } from "@/forms/schemas/appointment";

export type AppointmentFormValues = z.infer<typeof createAppointmentSchema>;

export interface Barber {
  id?: number | string;
  name: string;
  specialty: string;
  avatarUrl: string | undefined;
}
