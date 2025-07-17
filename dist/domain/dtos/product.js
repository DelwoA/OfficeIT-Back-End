"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductDTO = exports.createProductDTO = void 0;
const zod_1 = require("zod");
exports.createProductDTO = zod_1.z.object({
    name: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    discount: zod_1.z.number().min(0).optional(),
    // Changed from enum to string - will validate against database categories
    category: zod_1.z.string().min(1, "Category is required"),
    image: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    availability: zod_1.z.enum(["In Stock", "Out of Stock"]),
    specs: zod_1.z
        .record(zod_1.z.string().min(1), zod_1.z.string().min(1))
        .refine((specs) => Object.keys(specs).length > 0),
    featured: zod_1.z.boolean().optional(),
});
exports.updateProductDTO = zod_1.z.object({
    name: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    discount: zod_1.z.number().min(0),
    // Changed from enum to string - will validate against database categories
    category: zod_1.z.string().min(1, "Category is required"),
    image: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    availability: zod_1.z.enum(["In Stock", "Out of Stock"]),
    specs: zod_1.z
        .record(zod_1.z.string().min(1), zod_1.z.string().min(1))
        .refine((specs) => Object.keys(specs).length > 0),
    featured: zod_1.z.boolean().optional(),
});
//# sourceMappingURL=product.js.map