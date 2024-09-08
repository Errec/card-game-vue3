import { z } from "zod";

export const Monster = z.object({
  id: z.string(),
  name: z.string(),
  attack: z.number(),
  defense: z.number(),
  hp: z.number(),
  speed: z.number(),
  imageUrl: z.string().optional(),
});

export type Monster = z.infer<typeof Monster>;
