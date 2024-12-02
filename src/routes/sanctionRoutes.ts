import { Router } from "express";
import { ensureAuthenticated } from "../middlewares";
import { SanctionController } from "../modules/sanction/controller/SanctionController";
import { SanctionRepository } from "../modules/sanction/repository/SanctionRepository";

const sanctionRouter = Router();

const sanctionRepository = new SanctionRepository();
const sanctionController = new SanctionController(sanctionRepository);

sanctionRouter.use(ensureAuthenticated);

sanctionRouter.get("/user", (req, res) => {
  sanctionController.getByUserId(req, res);
});
sanctionRouter.get("/", (req, res) => {
  sanctionController.getByUserId(req, res);
});

export default sanctionRouter;
