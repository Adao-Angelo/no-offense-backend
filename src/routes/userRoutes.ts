import { Router } from "express";

const router = Router();

import { UserController } from "../modules/users/controllers";
const userController = new UserController();

router.post("/", async (req, res) => {
  await userController.createUser(req, res);
});

router.get("/:id", async (req, res) => {
  await userController.getUserById(req, res);
});

router.get("/email/:email", async (req, res) => {
  await userController.getUserByEmail(req, res);
});

router.put("/:id", async (req, res) => {
  await userController.updateUser(req, res);
});

router.delete("/:id", async (req, res) => {
  await userController.deleteUser(req, res);
});

router.get("/", async (req, res) => {
  await userController.getAllUsers(req, res);
});

export default router;
