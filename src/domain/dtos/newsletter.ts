import { z } from "zod";

export const newsletterDTO = z.object({
  email: z.email("Please provide a valid email address"),
});

export type NewsletterDTO = z.infer<typeof newsletterDTO>;
