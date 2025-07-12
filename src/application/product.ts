import { Request, Response, NextFunction } from "express";
import Product from "../infrastructure/schemas/Product";
import { createProductDTO, updateProductDTO } from "../domain/dtos/product";

import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";

// TODO: Import your Category model when it's created
// import Category from "../infrastructure/schemas/Category";

// Helper function to validate category exists in database
const validateCategoryExists = async (categoryName: string) => {
  // TODO: Uncomment and implement when Category model is ready
  // const category = await Category.findOne({ name: categoryName });
  // if (!category) {
  //   throw new NotFoundError(`Category '${categoryName}' does not exist`);
  // }
  // For now, just log a warning
  console.warn(
    `Category validation skipped for: ${categoryName}. Implement Category model validation.`
  );
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
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
    const product = await Product.create(req.body);
    res.status(201).json(product);
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
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    res.status(200).json(product);
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
    await Product.findByIdAndUpdate(productId, updatedProduct.data);

    // Return the response
    res.status(200).send();
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
    res.status(200).send();
    return;
  } catch (error) {
    next(error);
  }
};
