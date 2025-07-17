"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = uploadImage;
exports.optimizedUrl = optimizedUrl;
exports.squareCropUrl = squareCropUrl;
const cloudinary_1 = require("cloudinary");
require("dotenv/config");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
async function uploadImage(file, publicId) {
    return cloudinary_1.v2.uploader.upload(file, {
        folder: "officeit/products",
        public_id: publicId,
    });
}
function optimizedUrl(publicId) {
    return cloudinary_1.v2.url(publicId, { fetch_format: "auto", quality: "auto" });
}
function squareCropUrl(publicId) {
    return cloudinary_1.v2.url(publicId, {
        crop: "auto",
        gravity: "auto",
        width: 500,
        height: 500,
    });
}
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.js.map