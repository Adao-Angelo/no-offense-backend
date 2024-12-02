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

commentRouter.post("/", checkSanction, (req, res) => {
  commentController.create(req, res);
});
commentRouter.get("/", (req, res) => {
  commentController.getByUserId(req, res);
});

export default commentRouter;
