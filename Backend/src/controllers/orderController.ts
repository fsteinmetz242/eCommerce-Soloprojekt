import type { RequestHandler } from "express";
import { Order, Product, User } from "#models";
import { z } from "zod/v4";
import { orderInputSchema } from "#schemas";
import { Schema, Types } from "mongoose";

type OrderInputDTO = z.infer<typeof orderInputSchema>;
type OrderDTO = z.infer<typeof orderInputSchema>;

// Aufgeteilt
// Wenn man das erste mal was in den Warenkorb legt wird die Order angelegt.
// danach nur eine Position hinzufügen
// Warenkorb leer => createOrder
// Warenkorb besteht =>  addOrderPosition
//
// Besser Warenkorb im Frontend verwalten und erst bei bestellen übertragen
//
export const createOrder: RequestHandler<
  unknown,
  OrderDTO,
  OrderInputDTO
> = async (req, res) => {
  const { ordernumber, shopuserid, positions } = req.body;

  const user = User.findById(shopuserid);
  if (!user) {
    throw new Error("User not found!", { cause: { status: 404 } });
  }

  try {
    const chkInput = orderInputSchema.parse(req.body); //.parse damit das verschachtelte Schema geprüft wird
  } catch (error: any) {
    const result = JSON.parse(error.message);
    const { message } = result[0];
    throw new Error(message);
  }

  let totalOrder = 0;

  for (const pos of positions) {
    const checkProductExist = await Product.findById(pos.prodnumber);
    if (!checkProductExist) {
      throw new Error("Product not found!", { cause: { status: 404 } });
    }
    totalOrder = totalOrder + pos.price * pos.orderquantity;
  }

  const newOrder = await Order.create<OrderInputDTO>({
    ordernumber,
    shopuserid,
    positions,
    totalOrder,
  });

  res.status(201).json(newOrder);
};

export const getAllOrders: RequestHandler = async (req, res) => {
  const orders = await Order.find().select("ordernumber positions totalOrder"); // Nur diese Felder anzeigen

  if (!orders.length) {
    throw new Error("No Order found", { cause: { status: 404 } });
  }
  res.json(orders);
};

export const getOrderById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    throw new Error("Order not found", { cause: 404 });
  }

  res.status(200).json({
    message: `Order with id:${id} was deleted`,
    post: order,
  });
};

export const updateOrderById: RequestHandler<
  { id: string },
  OrderDTO,
  OrderInputDTO
> = async (req, res) => {
  const { id } = req.params;
  const { shopuserid, positions } = req.body as OrderInputDTO;
  const checkOrder = await Order.findById(id);

  if (!checkOrder) {
    throw new Error("Order not found", { cause: 404 });
  }

  const user = await User.findById(shopuserid);
  if (!user) {
    throw new Error("User not found", { cause: 404 });
  }

  let totalOrder = 0;

  for (const pos of positions) {
    const checkProductExist = await Product.findById(pos.prodnumber);
    if (!checkProductExist) {
      throw new Error("Product not found!", { cause: { status: 404 } });
    }
    totalOrder = totalOrder + pos.price * pos.orderquantity;
  }

  const updateOrder = await Order.findByIdAndUpdate(
    { _id: id },
    {
      positions: positions,
      shopuserid: shopuserid,
      totalOrder: totalOrder,
    },
    { new: true }
  );

  if (!updateOrder) {
    throw new Error("Order not found", { cause: { status: 404 } });
  }

  return res.json(updateOrder);
};

export const deleteOrder: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const deletedOrder = await Order.findByIdAndDelete(id);

  if (!deletedOrder) {
    throw new Error("Order not found", { cause: 404 });
  }

  res.status(200).json({
    message: `Order with id:${id} was deleted`,
    post: deletedOrder,
  });
};
