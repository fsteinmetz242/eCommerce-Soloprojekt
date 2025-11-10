import type { RequestHandler } from "express";
import { Category } from "#models";
import { z } from "zod/v4";
import type { categoryInputSchema } from "#schemas";

type CategoryInputDTO = z.infer<typeof categoryInputSchema>;
type CategoryDTO = z.infer<typeof categoryInputSchema>;

export const createCategory: RequestHandler<
  unknown,
  CategoryDTO,
  CategoryInputDTO
> = async (req, res) => {
  const { title } = req.body;

  const checkCategoryTitle = await Category.findOne({ title: title });
  console.log(`*** checkCategoryTitle ${title} ***`);

  if (checkCategoryTitle !== null) {
    throw new Error("Category exists", { cause: 401 });
  }

  const newCategory = await Category.create<CategoryInputDTO>({
    title,
  });

  res.status(201).json(newCategory);
};

export const getAllCategories: RequestHandler = async (req, res) => {
  const categories = await Category.find().populate("title");

  if (!categories.length) {
    throw new Error("No categories found", { cause: 404 });
  }

  res.status(200).json(categories);
};

export const getCategoryById: RequestHandler<
  { id: string },
  CategoryDTO,
  CategoryInputDTO
> = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate("title");

  if (!category) {
    throw new Error("Category not found", { cause: 404 });
  }

  res.status(200).json(category);
};

export const updateCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  console.log("Update");

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { title },
    { new: true, runValidators: true }
  ).populate("title");

  res.status(200).json({
    message: "category updated successfully",
    post: updatedCategory,
  });
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new Error("Product not found", { cause: 404 });
  }

  res.status(200).json({
    message: `Category with id:${id} was deleted`,
    post: deletedCategory,
  });
};
