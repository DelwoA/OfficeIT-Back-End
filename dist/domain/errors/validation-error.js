"use strict";
/**
 * Custom error class for 400 Bad Request errors
 * Used when request data fails validation against defined schemas
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
exports.default = ValidationError;
//# sourceMappingURL=validation-error.js.map