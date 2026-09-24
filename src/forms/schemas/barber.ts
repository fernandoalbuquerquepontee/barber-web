import z from "zod";

export const createBarberSchema = z.object({
  name: z.string(),
  specialty: z.string(),
  avatarUrl: z.url(),
});
