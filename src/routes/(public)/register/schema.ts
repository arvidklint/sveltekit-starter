import { z } from 'zod';

export const formSchema = z.object({
  username: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[A-Za-z0-9_-]+$/, {
      message: "Can only contain characters A to Z, numbers, underscore '_' and hyphens '-'",
    }),
  password: z.string().min(6).max(255),
});

export type FormSchema = typeof formSchema;
