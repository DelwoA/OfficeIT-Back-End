"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const unauthorized_error_1 = __importDefault(require("../../domain/errors/unauthorized-error"));
/**
 * Middleware to verify if a user is authenticated
 * Checks for the presence of a userId in the auth object (provided by Clerk)
 * Throws an UnauthorizedError if the user is not authenticated
 */
const isAuthenticated = (req, res, next) => {
    if (!req?.auth?.isAuthenticated) {
        throw new unauthorized_error_1.default("Unauthorized");
    }
    next();
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=authentication-middleware.js.map