import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../application/product";

const productsRouter = express.Router();

productsRouter.route("/").get(getAllProducts).post(createProduct);
productsRouter
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default productsRouter;
