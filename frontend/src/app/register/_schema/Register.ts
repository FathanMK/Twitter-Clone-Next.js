import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const RegisterSchema = z
  .object({
    displayName: z.string().min(1, { message: "Display Name is required!" }),
    username: z.string().min(1, { message: "Username is required!" }),
    email: z
      .string()
      .min(1, { message: "Email is required!" })
      .email({ message: "Email is invalid!" }),
    password: z.string().min(8, { message: "Password is required!" }),
    profilePicture: z
      .any()
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png, .avif and .webp formats are supported"
      )
      .refine((file) => file?.size <= 3000000, `Max image is 3MB!`),
    bannerPicture: z
      .any()
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only .jpg, .jpeg, .png, .avif and .webp formats are supported"
      )
      .refine((file) => file?.size <= 3000000, `Max image is 3MB!`),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match!",
  });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;
