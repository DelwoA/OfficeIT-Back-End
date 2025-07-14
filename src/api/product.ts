import express, { Request, Response, NextFunction } from "express";
const multer = require("multer");
import { uploadImage } from "../infrastructure/cloudinary";
import { getOptimizedImageUrl } from "./middleware/cloudinary-url-middleware";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../application/product";

// Extend Request interface to include file property
interface MulterRequest extends Request {
  file?: any;
}

const productsRouter = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req: any, file: any, cb: any) => {
    // Check if file is an image
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

// Image upload endpoint
productsRouter.post(
  "/upload-image",
  upload.single("image"),
  async (req: MulterRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      // Convert buffer to data URI for Cloudinary
      const dataUri = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;

      // Upload to Cloudinary
      const result = await uploadImage(dataUri);

      // Get optimized URL using our middleware
      const optimizedUrl = getOptimizedImageUrl(result.public_id);

      res.status(200).json({
        success: true,
        url: optimizedUrl,
        publicId: result.public_id,
      });
    } catch (error) {
      next(error);
    }
  }
);

productsRouter.route("/").get(getAllProducts).post(createProduct);
productsRouter
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default productsRouter;
