import z from "zod";

export const upsertServiceSchema = z.object({
  name: z.string(),
  price: z.number(),
});
