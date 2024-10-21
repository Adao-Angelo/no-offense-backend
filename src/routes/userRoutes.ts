import { Router } from "express";

const router = Router();

import { UserController } from "../modules/users/controllers";
const userController = new UserController();

router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.get("/email/:email", userController.getUserByEmail);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/", userController.getAllUsers);

export default router;
