"use strict";
/**
 * Custom error class for 404 Not Found errors
 * Used when a requested resource cannot be found in the database
 */
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
exports.default = NotFoundError;
//# sourceMappingURL=not-found-error.js.map