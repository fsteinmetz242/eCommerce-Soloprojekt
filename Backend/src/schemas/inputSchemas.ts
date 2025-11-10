import { User } from "#models";
import { optional, z } from "zod";

export const userInputSchema = z
  .object({
    firstName: z
      .string({ error: "firstName must be a string" })
      .min(2, { message: "firstName must be at least 2 chars long" }),

    lastName: z
      .string({ error: "lastName must be a string" })
      .min(2, { message: "lastName must be at least 2 chars long" }),

    email: z
      .string({ error: "email must be a string" })
      .email({ message: "email must be a valid email address" }),
    password: z
      .string({ error: "password must be a string" })
      .min(6, { message: "password must be at least 6 chars long" }),
  })
  .strict();

export const categoryInputSchema = z
  .object({
    title: z
      .string({ error: "title must be a string" })
      .min(5, { message: "title must be at least 5 characters long" }),
  })
  .strict();

export const productInputSchema = z
  .object({
    prodnumber: z
      .string({ error: "Product number must be a string" })
      .min(5, { message: "Product number must be at least 5 characters long" }),

    designation: z
      .string({ error: "Product designation must be a string" })
      .min(5, {
        message: "Product designation must be at least 5 characters long",
      }),

    quantity: z.number({ error: "Quantity must be a number" }),

    price: z.number({ error: "Price must be a number" }),

    unit: z
      .string({ error: "unit must be a string" })
      .min(2, { message: "unit must be at least 2 characters long" }),
    description: z.string({ error: "description must be a string" }).optional(),
  })
  .strict();

const orderPositionSchema = z.object({
  positionNumber: z.number({ error: "Positionnumber must be a number" }),
  prodnumber: z
    .string({ error: "Product number must be a string" })
    .min(5, { message: "Product number must be at least 5 characters long" }),

  designation: z
    .string({ error: "Product designation must be a string" })
    .min(5, {
      message: "Product designation must be at least 5 characters long",
    }),

  orderquantity: z.number({ error: "Quantity must be a number" }),

  price: z.number({ error: "Price must be a number" }),

  unit: z
    .string({ error: "unit must be a string" })
    .min(2, { message: "unit must be at least 2 characters long" }),
});

export const orderInputSchema = z
  .object({
    ordernumber: z
      .string({ error: "Order number must be a string" })
      .min(5, { message: "order number must be at least 5 characters long" }),
    shopuserid: z
      .string({ error: "Shop User Id must be a string" })
      .min(24, "Shop User Id must be at least 5 characters long"),
    positions: z.array(orderPositionSchema),
  })
  .strict();

export const authLoginSchema = z
  .object({
    email: z
      .string({ error: "email must me a string" })
      .email({ message: "email must be a valid email address" }),
    password: z
      .string({ error: "password must be a string" })
      .min(1, { message: "password is required" }),
  })
  .strict();

export const authRegisterSchema = z
  .object({
    firstName: z
      .string({ error: "firstName must be a string" })
      .min(2, { message: "firstName must be at least 2 chars long" }),

    lastName: z
      .string({ error: "lastName must be a string" })
      .min(2, { message: "lastName must be at least 2 chars long" }),

    email: z
      .string({ error: "email must me a string" })
      .email({ message: "email must be a valid email address" }),

    password: z
      .string({ error: "password must be a string" })
      .min(8, { message: "password must be at least 8 characters long" })
      .max(64, { message: "password must be at most 64 characters long" })
      .regex(/[a-z]/, { message: "password must include a lowercase letter" })
      .regex(/[A-Z]/, { message: "password must include an uppercase letter" })
      .regex(/\d/, { message: "password must include a number" })
      .regex(/[^A-Za-z0-9\s]/, {
        message: "password must include a special character",
      }),
  })
  .strict();

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ error: "password must be a string" })
      .min(1, { message: "current password is required" }),
    newPassword: z
      .string({ error: "password must be a string" })
      .min(8, { message: "password must be at least 8 characters long" })
      .max(64, { message: "password must be at most 64 characters long" })
      .regex(/[a-z]/, { message: "password must include a lowercase letter" })
      .regex(/[A-Z]/, { message: "password must include an uppercase letter" })
      .regex(/\d/, { message: "password must include a number" })
      .regex(/[^A-Za-z0-9\s]/, {
        message: "password must include a special character",
      }),
    confirmNewPassword: z
      .string({ error: "password must be a string" })
      .min(1, { message: "confirm new password is required" }),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "passwords must match",
  })
  .strict();
