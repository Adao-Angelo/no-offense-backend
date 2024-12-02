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

publicationRouter.post("/", (req, res) => {
  publicationController.create(req, res);
});
publicationRouter.get("/", (req, res) => {
  publicationController.getAll(req, res);
});
publicationRouter.delete("/:id", (req, res) => {
  publicationController.delete(req, res);
});

export default publicationRouter;
