"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = require("../application/category");
const categoriesRouter = express_1.default.Router();
categoriesRouter.route("/").get(category_1.getAllCategories).post(category_1.createCategory);
categoriesRouter.route("/:id").put(category_1.updateCategory).delete(category_1.deleteCategory);
exports.default = categoriesRouter;
//# sourceMappingURL=category.js.map