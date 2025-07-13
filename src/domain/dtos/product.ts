import { z } from "zod";

export const createProductDTO = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  discount: z.number().min(0).optional(),
  // Changed from enum to string - will validate against database categories
  category: z.string().min(1, "Category is required"),
  image: z.string().min(1),
  description: z.string().min(1),
  availability: z.enum(["In Stock", "Out of Stock"]),
  specs: z
    .record(z.string().min(1), z.string().min(1))
    .refine((specs) => Object.keys(specs).length > 0),
  featured: z.boolean().optional(),
});

// Export CreateProductDTO TypeScript type inferred from the Zod schemas
export type CreateProductDTO = z.infer<typeof createProductDTO>;

export const updateProductDTO = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  discount: z.number().min(0),
  // Changed from enum to string - will validate against database categories
  category: z.string().min(1, "Category is required"),
  image: z.string().min(1),
  description: z.string().min(1),
  availability: z.enum(["In Stock", "Out of Stock"]),
  specs: z
    .record(z.string().min(1), z.string().min(1))
    .refine((specs) => Object.keys(specs).length > 0),
  featured: z.boolean().optional(),
});

// Export UpdateProductDTO TypeScript type inferred from the Zod schemas
export type UpdateProductDTO = z.infer<typeof updateProductDTO>;
