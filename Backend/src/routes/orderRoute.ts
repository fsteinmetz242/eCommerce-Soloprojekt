import { Router } from "express";
import { createOrder } from "#controllers";
import { validateBodyZod } from "#middlewares";
import { orderInputSchema } from "#schemas";

const OrderRoutes = Router();

OrderRoutes.post("/", createOrder);

export default OrderRoutes;
