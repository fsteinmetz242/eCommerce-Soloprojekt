import {
  changePassword,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "#controllers";
import { authenticate, authorize, validateBodyZod } from "#middlewares";
import { User } from "#models";
import { changePasswordSchema, userInputSchema } from "#schemas";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.get("/:id", getUserById);
// userRoutes.post("/", validateBodyZod(userInputSchema), registerUser);

// Update
userRoutes.put(
  "/:id",
  authenticate,
  authorize(User),
  validateBodyZod(userInputSchema),
  updateUser
);
// Change PW
userRoutes.patch(
  "/:id/password",
  authenticate,
  authorize(User),
  validateBodyZod(changePasswordSchema),
  changePassword
);

// Delete User by ID
userRoutes.delete("/:id", authenticate, authorize(User), deleteUser);

export default userRoutes;
