"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const forbidden_error_1 = __importDefault(require("../../domain/errors/forbidden-error"));
/**
 * Middleware to check if a user has admin role
 * Verifies if the authenticated user has the 'admin' role in session claims
 * Throws a ForbiddenError if the user is not an admin
 */
const isAdmin = (req, res, next) => {
    if (!req?.auth?.has({ role: "admin" })) {
        throw new forbidden_error_1.default("Forbidden");
    }
    next();
};
exports.isAdmin = isAdmin;
//# sourceMappingURL=authorization-middleware.js.map