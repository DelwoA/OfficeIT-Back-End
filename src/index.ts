import "dotenv/config";
import express from "express";
import connectDB from "./infrastructure/db";
import cors from "cors";

import productsRouter from "./api/product";

const app = express();

// Middleware to parse JSON data in the request body
app.use(express.json());

// Middleware to handle CORS
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
// app.use(
//   cors({
//     origin: [FRONTEND_URL],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use(cors());

// Connect to MongoDB database
connectDB();

// Register API routes
app.use("/api/products", productsRouter);

// Define the port to run the server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
