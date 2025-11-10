import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "#controllers";
import { authenticate, authorize, validateBodyZod } from "#middlewares";
import { productInputSchema } from "#schemas";
import { Product } from "#models";

const ProductRoutes = Router();

ProductRoutes.get("/", getAllProducts);

ProductRoutes.post(
  "/",
  authenticate,
  validateBodyZod(productInputSchema),
  createProduct
);

ProductRoutes.get("/:id", getProductById);
ProductRoutes.put("/:id", authenticate, authorize(Product), updateProduct); // Kein authorize da Produkte nicht User abhängig,
ProductRoutes.delete("/:id", authenticate, authorize(Product), deleteProduct);
//ProductRoutes.get("/prodnumber/:prodNumber", getProductById);

export default ProductRoutes;
