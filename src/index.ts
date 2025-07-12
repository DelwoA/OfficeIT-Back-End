import "dotenv/config";
import express from "express";
import connectDB from "./infrastructure/db";
import corsMiddleware from "./api/middleware/cors";

import productsRouter from "./api/product";

const app = express();

// Middleware to parse JSON data in the request body
app.use(express.json());

// Setup CORS logic
app.use(corsMiddleware);

// Connect to MongoDB database
connectDB();

// Register API routes
app.use("/api/products", productsRouter);

// Define the port to run the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
