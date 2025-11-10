import type { RequestHandler } from "express";
import { Order } from "#models";
import { z } from "zod/v4";
import { orderInputSchema } from "#schemas";

type OrderInputDTO = z.infer<typeof orderInputSchema>;
type OrderDTO = z.infer<typeof orderInputSchema>;

// Aufgeteilt
// Wenn man das erste mal was in den Warenkorb legt wird die Order angelegt.
// danach nur eine Position hinzufügen
// Warenkorb leer => createOrder
// Warenkorb besteht =>  addOrderPosition
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
