"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getAllCategories = void 0;
const Category_1 = __importDefault(require("../infrastructure/schemas/Category"));
const category_1 = require("../domain/dtos/category");
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category_1.default.find();
        res.status(200).json(categories);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCategories = getAllCategories;
const createCategory = async (req, res, next) => {
    try {
        // Zod validator 'createCategoryDTO' used.
        const createdCategory = category_1.createCategoryDTO.safeParse(req.body);
        // Checking if the created category is in the shape of 'createCategoryDTO'
        if (!createdCategory.success) {
            throw new validation_error_1.default("Invalid category data");
        }
        // Create the category
        const category = await Category_1.default.create(createdCategory.data);
        // Return the response
        res.status(201).json(category);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        // Zod validator 'updateCategoryDTO' used.
        const updatedCategory = category_1.updateCategoryDTO.safeParse(req.body);
        // Checking if the updated category is in the shape of 'updateCategoryDTO'
        if (!updatedCategory.success) {
            throw new validation_error_1.default("Invalid category data");
        }
        // Update the category
        const category = await Category_1.default.findByIdAndUpdate(categoryId, updatedCategory.data, { new: true });
        // Return the response
        res.status(200).json(category);
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        // Delete the category
        await Category_1.default.findByIdAndDelete(categoryId);
        // Return the response
        res.status(200).send("Category deleted successfully");
        return;
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.js.map