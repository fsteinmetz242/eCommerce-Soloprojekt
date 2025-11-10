import type { RequestHandler } from "express";
import { Order } from "#models";
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

  try {
    console.log("Try");
    const chkInput = orderInputSchema.parse(req.body); //.parse damit das verschachtelte Schema geprüft wird
  } catch (error: any) {
    const result = JSON.parse(error.message);
    const { message } = result[0];
    throw new Error(message);
  }

  const newOrder = await Order.create<OrderInputDTO>({
    ordernumber,
    shopuserid,
    positions,
  });

  res.status(201).json(newOrder);
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
