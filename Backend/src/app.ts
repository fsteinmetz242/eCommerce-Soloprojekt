import express from "express";
import "#db";
import {
  authRoutes,
  userRoutes,
  productRoutes,
  categoryRoutes,
  orderRoutes,
} from "#routes";
import { errorHandler } from "#middlewares";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

// body-parser
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);
//app.use("/productsExt", productRoutesExt);
app.use("/categories", categoryRoutes);
// app.use("/order", orderRoutes);

app.use("/order", orderRoutes);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`\x1b[35mMain app listening at http://localhost:${port}\x1b`)
);
