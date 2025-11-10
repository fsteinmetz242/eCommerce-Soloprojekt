import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
} from "#controllers";
import { authenticate, authorize, validateBodyZod } from "#middlewares";
import { orderInputSchema } from "#schemas";
import { Order } from "#models";

const OrderRoutes = Router();

OrderRoutes.get("/", getAllOrders);
OrderRoutes.post("/", createOrder);
OrderRoutes.get("/:id", authenticate, authorize(Order), getOrderById);
OrderRoutes.delete("/:id", authenticate, authorize(Order), deleteOrder);

export default OrderRoutes;
