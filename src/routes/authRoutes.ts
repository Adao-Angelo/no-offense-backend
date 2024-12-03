import { Router } from "express";
import { AuthenticateUserController } from "../modules/authenticate/controller/AuthenticateUserController";

const authenticateUserRouter = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateUserRouter.post("/", async (req, res) => {
  await authenticateUserController.handle(req, res);
});

export default authenticateUserRouter;
