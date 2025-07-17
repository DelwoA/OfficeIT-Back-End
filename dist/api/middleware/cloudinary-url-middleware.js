"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptimizedImageUrl = getOptimizedImageUrl;
const cloudinary_1 = __importDefault(require("../../infrastructure/cloudinary"));
/**
 * Generates an optimized Cloudinary URL for images with auto quality and format
 * @param publicId - The public ID of the image in Cloudinary
 * @param options - Optional transformation parameters
 * @returns Optimized image URL
 */
function getOptimizedImageUrl(publicId, options) {
    const { width = 1200, height = 1200, quality = "auto", fetchFormat = "auto", } = options || {};
    return cloudinary_1.default.url(publicId, {
        transformation: [
            {
                quality,
                fetch_format: fetchFormat,
            },
            {
                width,
                height,
            },
        ],
    });
}
//# sourceMappingURL=cloudinary-url-middleware.js.map