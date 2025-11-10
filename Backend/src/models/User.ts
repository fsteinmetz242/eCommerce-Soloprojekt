import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    roles: {
      type: [String],
      default: ["user"],
    },
    tokenVersion: {
      type: Number,
      default: 0,
      select: false,
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
