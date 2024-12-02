import { Router } from "express";
import { VerifyEmailController } from "../modules/verify/controller/VerifyEmailController";

const verifyEmailRouter = Router();
const verifyEmailController = new VerifyEmailController();

verifyEmailRouter.get("/", (req, res) => {
  verifyEmailController.handle(req, res);
});

export default verifyEmailRouter;
