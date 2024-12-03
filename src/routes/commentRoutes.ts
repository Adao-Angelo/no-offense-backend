import { Router } from "express";
import { ensureAuthenticated } from "../middlewares";
import { checkSanction } from "../middlewares/checkSanction";
import { CommentController } from "../modules/comments/controller/CommentController";
import { CommentRepository } from "../modules/comments/repository/CommentRepository";
import { CommentService } from "../services/CommentService";

const commentRouter = Router();

const commentRepository = new CommentRepository();
const commentService = new CommentService(commentRepository);
const commentController = new CommentController(commentService);

commentRouter.use(ensureAuthenticated);

commentRouter.post("/", checkSanction, async (req, res) => {
  await commentController.create(req, res);
});
commentRouter.get("/", async (req, res) => {
  await commentController.getByUserId(req, res);
});

export default commentRouter;
