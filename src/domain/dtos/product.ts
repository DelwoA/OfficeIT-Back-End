import { z } from "zod";

export const createProductDTO = z.object({
  productId: z.string().optional(), // Auto-generated, so optional in creation
  name: z.string().min(1),
  price: z.number().positive(),
  discount: z.number().min(0).optional(),
  category: z.enum([
    "Computers",
    "Printers",
    "Networking",
    "Software",
    "Accessories",
  ]),
  image: z.string().min(1),
  description: z.string().min(1),
  availability: z.enum(["In Stock", "Out of Stock"]),
  specs: z
    .record(z.string().min(1), z.string().min(1))
    .refine((specs) => Object.keys(specs).length > 0),
});

export type CreateProductDTO = z.infer<typeof createProductDTO>;
