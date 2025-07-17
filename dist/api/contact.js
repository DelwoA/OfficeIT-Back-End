"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const mailer_1 = require("../infrastructure/utils/mailer");
const contact_1 = require("../domain/dtos/contact");
const contactRouter = express_1.default.Router();
// POST /api/contact - Send contact form email
contactRouter.post("/", async (req, res) => {
    try {
        // Validate the contact form input
        const contactData = contact_1.contactDTO.parse(req.body);
        // Send the contact email
        await (0, mailer_1.sendContactEmail)(contactData);
        res.status(200).json({
            success: true,
            message: "Your message has been sent successfully",
        });
    }
    catch (error) {
        // Handle validation errors
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Please check your input and try again",
                errors: error.issues,
            });
        }
        // Handle email sending errors
        console.error("Contact form error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to send your message. Please try again later.",
        });
    }
});
exports.default = contactRouter;
//# sourceMappingURL=contact.js.map