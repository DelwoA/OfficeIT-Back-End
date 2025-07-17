"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategoryDTO = exports.createCategoryDTO = void 0;
const zod_1 = require("zod");
exports.createCategoryDTO = zod_1.z.object({
    name: zod_1.z.string().min(1),
});
exports.updateCategoryDTO = zod_1.z.object({
    name: zod_1.z.string().min(1),
});
//# sourceMappingURL=category.js.map