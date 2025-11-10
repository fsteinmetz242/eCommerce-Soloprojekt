import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "#controllers";
import { authenticate, authorize, validateBodyZod } from "#middlewares";
import { categoryInputSchema } from "#schemas";
import { Category } from "#models";

const CategoryRoutes = Router();

CategoryRoutes.get("/", getAllCategories);

CategoryRoutes.post(
  "/",
  authenticate,
  //                                      authorize geht nicht da keine ID vorhanden. Model wird aber über ID geholt
  validateBodyZod(categoryInputSchema),
  createCategory
);

CategoryRoutes.get("/:id", getCategoryById);
CategoryRoutes.put(
  "/:id",
  authenticate,
  authorize(Category),
  validateBodyZod(categoryInputSchema),
  updateCategory
);
CategoryRoutes.delete(
  "/:id",
  authenticate,
  authorize(Category),
  deleteCategory
);

export default CategoryRoutes;
