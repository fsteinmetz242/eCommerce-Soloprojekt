import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model("Category", categorySchema);
