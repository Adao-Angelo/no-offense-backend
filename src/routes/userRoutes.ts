import { Router } from "express";

const router = Router();

import { UserController } from "../modules/users/controllers";
const userController = new UserController();

router.post("/users", userController.createUser);
router.get("/users/:id", userController.getUserById);
router.get("/users/email/:email", userController.getUserByEmail);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.get("/users", userController.getAllUsers);

export default router;
