"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactDTO = void 0;
const zod_1 = require("zod");
exports.contactDTO = zod_1.z.object({
    fullName: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    email: zod_1.z.email("Please provide a valid email address"),
    phone: zod_1.z.string().optional(),
    subject: zod_1.z.string().min(3, "Subject must be at least 3 characters"),
    message: zod_1.z.string().min(10, "Message must be at least 10 characters"),
});
//# sourceMappingURL=contact.js.map