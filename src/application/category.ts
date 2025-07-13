import { Request, Response, NextFunction } from "express";
import Category from "../infrastructure/schemas/Category";
import { createCategoryDTO, updateCategoryDTO } from "../domain/dtos/category";

import ValidationError from "../domain/errors/validation-error";

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
    return;
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Zod validator 'createCategoryDTO' used.
    const createdCategory = createCategoryDTO.safeParse(req.body);

    // Checking if the created category is in the shape of 'createCategoryDTO'
    if (!createdCategory.success) {
      throw new ValidationError("Invalid category data");
    }

    // Create the category
    const category = await Category.create(createdCategory.data);

    // Return the response
    res.status(201).json(category);
    return;
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.params.id;

    // Zod validator 'updateCategoryDTO' used.
    const updatedCategory = updateCategoryDTO.safeParse(req.body);

    // Checking if the updated category is in the shape of 'updateCategoryDTO'
    if (!updatedCategory.success) {
      throw new ValidationError("Invalid category data");
    }

    // Update the category
    const category = await Category.findByIdAndUpdate(
      categoryId,
      updatedCategory.data,
      { new: true }
    );

    // Return the response
    res.status(200).json(category);
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = req.params.id;

    // Delete the category
    await Category.findByIdAndDelete(categoryId);

    // Return the response
    res.status(200).send("Category deleted successfully");
    return;
  } catch (error) {
    next(error);
  }
};
