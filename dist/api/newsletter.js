"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const newsletter_1 = require("../infrastructure/utils/newsletter");
const newsletter_2 = require("../domain/dtos/newsletter");
const newsletterRouter = express_1.default.Router();
// POST /api/newsletter - Subscribe to newsletter
newsletterRouter.post("/", async (req, res) => {
    try {
        // Validate the email input
        const { email } = newsletter_2.newsletterDTO.parse(req.body);
        // Add subscriber to Brevo list
        await (0, newsletter_1.addSubscriberToNewsletter)(email);
        res.status(200).json({
            success: true,
            message: "Successfully subscribed to newsletter",
        });
    }
    catch (error) {
        // Handle validation errors
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
                errors: error.issues,
            });
        }
        // Handle Brevo API errors
        if (error.response?.status === 400) {
            return res.status(400).json({
                success: false,
                message: "This email is already subscribed to our newsletter",
            });
        }
        // Handle other errors
        console.error("Newsletter subscription error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while subscribing to newsletter",
        });
    }
});
exports.default = newsletterRouter;
//# sourceMappingURL=newsletter.js.map