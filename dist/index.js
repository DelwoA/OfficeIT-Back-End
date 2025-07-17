"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./infrastructure/db"));
const global_error_handling_middleware_1 = __importDefault(require("./api/middleware/global-error-handling-middleware"));
const cors_1 = __importDefault(require("./api/middleware/cors"));
const express_2 = require("@clerk/express");
const product_1 = __importDefault(require("./api/product"));
const category_1 = __importDefault(require("./api/category"));
const newsletter_1 = __importDefault(require("./api/newsletter"));
const contact_1 = __importDefault(require("./api/contact"));
const app = (0, express_1.default)();
// Add Clerk authentication middleware
app.use((0, express_2.clerkMiddleware)());
// Middleware to parse JSON data in the request body
app.use(express_1.default.json());
// Setup CORS logic
app.use(cors_1.default);
// Connect to MongoDB database
(0, db_1.default)();
// Register API routes
app.use("/api/products", product_1.default);
app.use("/api/categories", category_1.default);
app.use("/api/newsletter", newsletter_1.default);
app.use("/api/contact", contact_1.default);
// Register global error handling middleware
app.use(global_error_handling_middleware_1.default);
// Export the app for Vercel deployment
exports.default = app;
// For local development
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
}
//# sourceMappingURL=index.js.map