"use strict";
/**
 * Custom error class for 403 Forbidden errors
 * Used when a user attempts to access a resource they don't have permission for
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = "ForbiddenError";
    }
}
exports.default = ForbiddenError;
//# sourceMappingURL=forbidden-error.js.map