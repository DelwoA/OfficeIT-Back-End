import express, { Request, Response } from "express";
import { z } from "zod";
import { addSubscriberToNewsletter } from "../infrastructure/utils/newsletter";
import { newsletterDTO } from "../domain/dtos/newsletter";

const newsletterRouter = express.Router();

// POST /api/newsletter - Subscribe to newsletter
newsletterRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Validate the email input
    const { email } = newsletterDTO.parse(req.body);

    // Add subscriber to Brevo list
    await addSubscriberToNewsletter(email);

    res.status(200).json({
      success: true,
      message: "Successfully subscribed to newsletter",
    });
  } catch (error: any) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
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

export default newsletterRouter;
