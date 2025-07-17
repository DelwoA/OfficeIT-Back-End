"use strict";
/**
 * Custom error class for 401 Unauthorized errors
 * Used when a user is not authenticated or their authentication is invalid
 */
Object.defineProperty(exports, "__esModule", { value: true });
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnauthorizedError";
    }
}
exports.default = UnauthorizedError;
//# sourceMappingURL=unauthorized-error.js.map