import { Router } from "express";
import { getProductByProdNum } from "#controllers";
import { validateBodyZod } from "#middlewares";
import { productInputSchema } from "#schemas";

const ProductRoutesExt = Router();

ProductRoutesExt.get("/:prodNumber", getProductByProdNum);

export default ProductRoutesExt;
