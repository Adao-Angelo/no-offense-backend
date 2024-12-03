import { Router } from "express";
import { VerifyEmailController } from "../modules/verify/controller/VerifyEmailController";

const verifyEmailRouter = Router();
const verifyEmailController = new VerifyEmailController();

verifyEmailRouter.get("/", async (req, res) => {
  await verifyEmailController.handle(req, res);
});

export default verifyEmailRouter;
