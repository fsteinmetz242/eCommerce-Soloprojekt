import type { RequestHandler } from "express";
import { Product } from "#models";
import { z } from "zod/v4";
import type { productInputSchema } from "#schemas";

type ProductInputDTO = z.infer<typeof productInputSchema>;
type ProductDTO = z.infer<typeof productInputSchema>;

export const createProduct: RequestHandler<
  unknown,
  ProductDTO,
  ProductInputDTO
> = async (req, res) => {
  const { prodnumber, designation, quantity, price, unit, description } =
    req.body;

  const checkProdNumber = await Product.findOne({ prodnumber: prodnumber });
  console.log(checkProdNumber);

  if (checkProdNumber !== null) {
    throw new Error("Product exists", { cause: 401 });
  }

  const files = (req.files as Express.Multer.File[]) || [];
  const imageUrl = files.map((f) => f.path);

  const newProduct = await Product.create<ProductInputDTO>({
    prodnumber,
    designation,
    quantity,
    price,
    unit,
    description,
    image_url: imageUrl,
  });

  res.status(201).json(newProduct);
};

export const getAllProducts: RequestHandler = async (req, res) => {
  const products = await Product.find().populate("prodnumber", "price");

  if (!products.length) {
    throw new Error("No products found", { cause: 404 });
  }

  res.status(200).json(products);
};

export const getProductById: RequestHandler<
  { id: string },
  ProductDTO,
  ProductInputDTO
> = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate("prodnumber", "price");

  if (!product) {
    throw new Error("Product not found", { cause: 404 });
  }

  res.status(200).json(product);
};

export const getProductByProdNum: RequestHandler = async (req, res) => {
  const { prodNumber } = req.params;
  console.log("prodNumber: ");
  console.log("prodNumber: ", prodNumber);
  const product = await Product.findOne({ prodnumber: prodNumber }).populate(
    "prodnumber",
    "price"
  );

  if (!product) {
    throw new Error("*Product not found", { cause: 404 });
  }

  res.status(200).json(product);
};

export const updateProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { prodnumber, price, category, description } = req.body;

  console.log("Update");

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { prodnumber, price, category, description },
    { new: true, runValidators: true }
  ).populate("prodnumber", "price");

  res.status(200).json({
    message: "product updated successfully",
    post: updatedProduct,
  });
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new Error("Product not found", { cause: 404 });
  }

  res.status(200).json({
    message: `Product with id:${id} was deleted`,
    post: deletedProduct,
  });
};
