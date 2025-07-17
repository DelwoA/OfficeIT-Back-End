"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.createProduct = exports.getAllProducts = void 0;
const Product_1 = __importDefault(require("../infrastructure/schemas/Product"));
const product_1 = require("../domain/dtos/product");
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product_1.default.find();
        // Return the response
        res.status(200).json(products);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProducts = getAllProducts;
const createProduct = async (req, res, next) => {
    try {
        // Zod validator 'createProductDTO' used.
        const createdProduct = product_1.createProductDTO.safeParse(req.body);
        // Checking if the created product is in the shape of 'createProductDTO'
        if (!createdProduct.success) {
            throw new validation_error_1.default("Invalid product data");
        }
        // Create the product
        const product = await Product_1.default.create(createdProduct.data);
        // Return the response
        res.status(201).json(product);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.createProduct = createProduct;
const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;
        // Find the product by id
        const product = await Product_1.default.findById(productId);
        if (!product) {
            throw new not_found_error_1.default("Product not found");
        }
        // Check if the product has a category
        if (!product.category) {
            throw new not_found_error_1.default("Product has no category");
        }
        // Return the response
        res.status(200).json(product);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        // Zod validator 'updateProductDTO' used.
        const updatedProduct = product_1.updateProductDTO.safeParse(req.body);
        // Checking if the updated product is in the shape of 'updateProductDTO'
        if (!updatedProduct.success) {
            throw new validation_error_1.default("Invalid product data");
        }
        // Update the product
        const product = await Product_1.default.findByIdAndUpdate(productId, updatedProduct.data, { new: true });
        // Return the response
        res.status(200).json(product);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        // Delete the product
        await Product_1.default.findByIdAndDelete(productId);
        // Return the response
        res.status(200).send("Product deleted successfully");
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=product.js.map