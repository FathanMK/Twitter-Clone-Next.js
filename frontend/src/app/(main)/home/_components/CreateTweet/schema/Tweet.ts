import { z } from "zod";

export const TweetSchema = z.object({
  tweet: z.string().max(280, "Max character exceeded!"),
  images: z.any(),
});

export type TTweetSchema = z.infer<typeof TweetSchema>;
