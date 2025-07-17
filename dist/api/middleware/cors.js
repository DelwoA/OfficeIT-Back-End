"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const whitelist = new Set([
    "http://localhost:5173",
    "http://localhost:5174",
    "https://office-it-front-end.vercel.app",
    "https://officeit.lk",
]);
const corsOptions = {
    optionsSuccessStatus: 200,
    origin: function (origin, callback) {
        if (!origin || whitelist.has(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
// Creates a CORS middleware with custom origin validation
// Used to control which domains can access the API from browsers
exports.default = (0, cors_1.default)(corsOptions);
//# sourceMappingURL=cors.js.map