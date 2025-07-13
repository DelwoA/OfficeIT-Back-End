import { Request, Response, NextFunction } from "express";
import Product from "../infrastructure/schemas/Product";
import { createProductDTO, updateProductDTO } from "../domain/dtos/product";

import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();

    // Return the response
    res.status(200).json(products);
    return;
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Zod validator 'createProductDTO' used.
    const createdProduct = createProductDTO.safeParse(req.body);

    // Checking if the created product is in the shape of 'createProductDTO'
    if (!createdProduct.success) {
      throw new ValidationError("Invalid product data");
    }

    // Create the product
    const product = await Product.create(createdProduct.data);

    // Return the response
    res.status(201).json(product);
    return;
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;

    // Find the product by id
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    // Check if the product has a category
    if (!product.category) {
      throw new NotFoundError("Product has no category");
    }

    // Return the response
    res.status(200).json(product);
    return;
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;

    // Zod validator 'updateProductDTO' used.
    const updatedProduct = updateProductDTO.safeParse(req.body);

    // Checking if the updated product is in the shape of 'updateProductDTO'
    if (!updatedProduct.success) {
      throw new ValidationError("Invalid product data");
    }

    // Update the product
    const product = await Product.findByIdAndUpdate(
      productId,
      updatedProduct.data,
      { new: true }
    );

    // Return the response
    res.status(200).json(product);
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.id;

    // Delete the product
    await Product.findByIdAndDelete(productId);

    // Return the response
    res.status(200).send("Product deleted successfully");
    return;
  } catch (error) {
    next(error);
  }
};
