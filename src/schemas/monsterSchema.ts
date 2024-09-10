import { z } from "zod";

export const MonsterSchema = z.object({
  id: z.string(),
  name: z.string(),
  attack: z.number().positive(),
  defense: z.number().positive(),
  hp: z.number().positive(),
  speed: z.number().positive(),
  imageUrl: z.string().optional(),
});

export type Monster = z.infer<typeof MonsterSchema>;
