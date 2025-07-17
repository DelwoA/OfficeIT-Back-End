import "dotenv/config";
import express from "express";
import connectDB from "./infrastructure/db";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import corsMiddleware from "./api/middleware/cors";
import { clerkMiddleware } from "@clerk/express";

import productsRouter from "./api/product";
import categoriesRouter from "./api/category";
import newsletterRouter from "./api/newsletter";
import contactRouter from "./api/contact";

const app = express();

// Add Clerk authentication middleware
app.use(clerkMiddleware());

// Middleware to parse JSON data in the request body
app.use(express.json());

// Setup CORS logic
app.use(corsMiddleware);

// Connect to MongoDB database
connectDB();

// Register API routes
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/contact", contactRouter);

// Register global error handling middleware
app.use(globalErrorHandlingMiddleware);

// Export the app for Vercel deployment
export default app;

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
}
