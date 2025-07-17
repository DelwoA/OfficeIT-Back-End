"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const counter_model_1 = __importDefault(require("../counter.model"));
const ProductSchema = new mongoose_1.default.Schema({
    productId: {
        type: String,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    availability: {
        type: String,
        required: true,
    },
    specs: {
        type: Object,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
});
// PRE-SAVE HOOK → assign the next 4-digit product ID automatically
// This is a pre-save hook that will be executed before the product is saved to the database
ProductSchema.pre("save", async function (next) {
    // Skip if we already have a productId (e.g. on updates)
    if (this.productId)
        return next();
    try {
        const counter = await counter_model_1.default.findOneAndUpdate({ _id: "productId" }, // sequence key
        { $inc: { seq: 1 } }, // atomically increment
        { new: true, upsert: true });
        // counter.seq will be 1, 2, 3, …
        // Format as 5-digit padded number: "00001", "00002", "00003"
        this.productId = counter.seq.toString().padStart(5, "0");
        next();
    }
    catch (error) {
        next(error instanceof Error ? error : new Error(String(error)));
    }
});
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.default = Product;
//# sourceMappingURL=Product.js.map