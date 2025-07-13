import express from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../application/category";

const categoriesRouter = express.Router();

categoriesRouter.route("/").get(getAllCategories).post(createCategory);
categoriesRouter.route("/:id").put(updateCategory).delete(deleteCategory);

export default categoriesRouter;
