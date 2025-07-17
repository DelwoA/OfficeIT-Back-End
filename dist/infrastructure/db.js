"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Establishes a connection to MongoDB using the connection string from environment variables
 *
 * This function:
 * 1. Retrieves the MongoDB connection URL from environment variables
 * 2. Validates that the connection URL is present
 * 3. Attempts to connect to the MongoDB database
 * 4. Logs success or failure messages
 *
 * @returns {Promise<void>} A promise that resolves when the connection is established
 * @throws {Error} If MONGODB_URL environment variable is not set
 */
const connectDB = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL;
        if (!MONGODB_URL) {
            throw new Error("MONGODB_URL is not set");
        }
        await mongoose_1.default.connect(MONGODB_URL);
        console.log("Connected to the database...");
    }
    catch (error) {
        console.log("Error connecting to the database...");
        console.log(error);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map