import { Router } from "express";
import { AuthenticateUserController } from "../modules/authenticate/controller/AuthenticateUserController";

const authenticateUserRouter = Router();
const authenticateUserController = new AuthenticateUserController();

authenticateUserRouter.post("/", (req, res) => {
  authenticateUserController.handle(req, res);
});

export default authenticateUserRouter;
