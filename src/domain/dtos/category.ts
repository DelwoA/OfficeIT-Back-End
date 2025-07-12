import { z } from "zod";

export const createCategoryDTO = z.object({
  name: z.string().min(1),
});

// Export CreateCategoryDTO TypeScript type inferred from the Zod schemas
export type CreateCategoryDTO = z.infer<typeof createCategoryDTO>;

export const updateCategoryDTO = z.object({
  name: z.string().min(1),
});

// Export UpdateCategoryDTO TypeScript type inferred from the Zod schemas
export type UpdateCategoryDTO = z.infer<typeof updateCategoryDTO>;
