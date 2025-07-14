import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(file: string | Buffer, publicId?: string) {
  return cloudinary.uploader.upload(file as any, {
    folder: "officeit/products",
    public_id: publicId,
  });
}

export function optimizedUrl(publicId: string) {
  return cloudinary.url(publicId, { fetch_format: "auto", quality: "auto" });
}

export function squareCropUrl(publicId: string) {
  return cloudinary.url(publicId, {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });
}

export default cloudinary;
