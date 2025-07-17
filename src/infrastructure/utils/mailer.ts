import nodemailer from "nodemailer";

// Load environment variables
const GMAIL_SENDER_EMAIL = process.env.GMAIL_SENDER_EMAIL;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER;

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: GMAIL_SENDER_EMAIL,
    pass: GMAIL_APP_PASSWORD,
  },
});

/**
 * Sends a contact email notification with form data
 */
export async function sendContactEmail(contactData: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}): Promise<void> {
  try {
    const emailText = `
New Contact Form Submission:

Name: ${contactData.fullName}
Email: ${contactData.email}
Phone: ${contactData.phone || "Not provided"}
Subject: ${contactData.subject}

Message:
${contactData.message}

---
This email was sent from the Office IT website contact form.
    `.trim();

    await transporter.sendMail({
      from: GMAIL_SENDER_EMAIL,
      to: EMAIL_RECEIVER,
      subject: `New Office IT Inquiry: ${contactData.subject}`,
      text: emailText,
    });

    console.log("Contact email sent successfully");
  } catch (error) {
    console.error("Error sending contact email:", error);
    throw error;
  }
}
