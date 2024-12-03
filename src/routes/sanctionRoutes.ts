import { Router } from "express";
import { ensureAuthenticated } from "../middlewares";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { SanctionController } from "../modules/sanction/controller/SanctionController";
import { SanctionRepository } from "../modules/sanction/repository/SanctionRepository";

const sanctionRouter = Router();

const sanctionRepository = new SanctionRepository();
const sanctionController = new SanctionController(sanctionRepository);

sanctionRouter.use(ensureAuthenticated);
sanctionRouter.use(ensureAdmin);

sanctionRouter.get("/user", async (req, res) => {
  await sanctionController.getByUserId(req, res);
});
sanctionRouter.get("/", async (req, res) => {
  await sanctionController.getAll(req, res);
});

export default sanctionRouter;
