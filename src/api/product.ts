import express from "express";
import { getAllProducts, createProduct } from "../application/product";

const productsRouter = express.Router();

productsRouter.route("/").get(getAllProducts).post(createProduct);

export default productsRouter;
