"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer = require("multer");
const cloudinary_1 = require("../infrastructure/cloudinary");
const cloudinary_url_middleware_1 = require("./middleware/cloudinary-url-middleware");
const product_1 = require("../application/product");
const productsRouter = express_1.default.Router();
// Configure multer for memory storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        // Check if file is an image
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        }
        else {
            cb(new Error("Only image files are allowed!"));
        }
    },
});
// Image upload endpoint
productsRouter.post("/upload-image", upload.single("image"), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image file provided" });
        }
        // Convert buffer to data URI for Cloudinary
        const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        // Upload to Cloudinary
        const result = await (0, cloudinary_1.uploadImage)(dataUri);
        // Get optimized URL using our middleware
        const optimizedUrl = (0, cloudinary_url_middleware_1.getOptimizedImageUrl)(result.public_id);
        res.status(200).json({
            success: true,
            url: optimizedUrl,
            publicId: result.public_id,
        });
    }
    catch (error) {
        next(error);
    }
});
productsRouter.route("/").get(product_1.getAllProducts).post(product_1.createProduct);
productsRouter
    .route("/:id")
    .get(product_1.getProductById)
    .put(product_1.updateProduct)
    .delete(product_1.deleteProduct);
exports.default = productsRouter;
//# sourceMappingURL=product.js.map