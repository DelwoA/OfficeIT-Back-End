import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../application/category";
import { isAuthenticated } from "./middleware/authentication-middleware";
import { isAdmin } from "./middleware/authorization-middleware";

const categoriesRouter = express.Router();

categoriesRouter
  .route("/")
  .get(getAllCategories)
  .post(isAuthenticated, isAdmin, createCategory);
categoriesRouter
  .route("/:id")
  .put(isAuthenticated, isAdmin, updateCategory)
  .delete(isAuthenticated, isAdmin, deleteCategory);

export default categoriesRouter;
