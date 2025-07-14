import "dotenv/config";
import express from "express";
import connectDB from "./infrastructure/db";
import globalErrorHandlingMiddleware from "./api/middleware/global-error-handling-middleware";
import corsMiddleware from "./api/middleware/cors";
import { clerkMiddleware } from "@clerk/express";
import cloudinary from "./infrastructure/cloudinary";

import productsRouter from "./api/product";
import categoriesRouter from "./api/category";
import newsletterRouter from "./api/newsletter";

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

// Register global error handling middleware
app.use(globalErrorHandlingMiddleware);

// Define the port to run the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
