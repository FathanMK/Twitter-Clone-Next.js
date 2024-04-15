import { z } from "zod";

const IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const ReplySchema = z.object({
  tweet: z.string().max(280, "Max character exceeded!"),
  images: z.any(),
});

export type TReplySchema = z.infer<typeof ReplySchema>;
