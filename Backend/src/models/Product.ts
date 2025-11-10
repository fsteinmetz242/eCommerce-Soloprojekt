import mongoose, { Schema, Types, model } from "mongoose";

const productSchema = new Schema(
  {
    prodnumber: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: { type: String, required: true, trim: true },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    image_url: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default model("Product", productSchema);
