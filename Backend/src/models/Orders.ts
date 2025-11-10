import mongoose, { Schema, model } from "mongoose";
import type { required } from "zod/mini";

const orderPositionSchema = new Schema({
  positionNumber: { type: Number, required: true, trim: true, default: 1 },
  //  prodnumber: { type: String, required: true, trim: true },
  prodnumber: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  designation: { type: String, required: true, trim: true },
  orderquantity: { type: Number, required: true, trim: true, default: 0 },
  price: { type: Number, required: true },
  unit: { type: String, required: true, trim: true },
});

const orderSchema = new Schema({
  ordernumber: {
    type: String,
    required: true,
    trim: true,
  },
  shopuserid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  positions: [{ type: orderPositionSchema }],
});
export default model("Order", orderSchema);
