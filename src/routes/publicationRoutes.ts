import { Router } from "express";
import { ensureAuthenticated } from "../middlewares";
import { PublicationController } from "../modules/publications/controller/PublicationController";
import { PublicationRepository } from "../modules/publications/repository/PublicationRepository";
import { UserRepository } from "../modules/users/repositories";

const publicationRouter = Router();

publicationRouter.use(ensureAuthenticated);
const publicationRepository = new PublicationRepository();
const userRepository = new UserRepository();
const publicationController = new PublicationController(
  publicationRepository,
  userRepository
);

publicationRouter.use(ensureAuthenticated);

publicationRouter.post("/", async (req, res) => {
  await publicationController.create(req, res);
});
publicationRouter.get("/", async (req, res) => {
  await publicationController.getAll(req, res);
});
publicationRouter.delete("/:id", async (req, res) => {
  await publicationController.delete(req, res);
});

export default publicationRouter;
