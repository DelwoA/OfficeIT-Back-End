"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsletterDTO = void 0;
const zod_1 = require("zod");
exports.newsletterDTO = zod_1.z.object({
    email: zod_1.z.email("Please provide a valid email address"),
});
//# sourceMappingURL=newsletter.js.map