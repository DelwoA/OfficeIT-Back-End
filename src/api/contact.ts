import express, { Request, Response } from "express";
import { z } from "zod";
import { sendContactEmail } from "../infrastructure/utils/mailer";
import { contactDTO } from "../domain/dtos/contact";

const contactRouter = express.Router();

// POST /api/contact - Send contact form email
contactRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Validate the contact form input
    const contactData = contactDTO.parse(req.body);

    // Send the contact email
    await sendContactEmail(contactData);

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully",
    });
  } catch (error: any) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
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

export default contactRouter;
