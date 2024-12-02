import { Request, Response } from "express";
import { CommentService } from "../../../services/CommentService";

export class CommentController {
  constructor(private commentService: CommentService) {}

  async create(req: Request, res: Response) {
    const userId = req.user.id;
    const { publicationId, text } = req.body;

    const comment = await this.commentService.createComment(
      userId,
      publicationId,
      text
    );

    return res.status(201).json({ message: "Comment created", comment });
  }

  async getByUserId(req: Request, res: Response) {
    const userId = req.user.id;

    const comments = await this.commentService.getCommentsByUser(userId);

    return res.status(200).json(comments);
  }
}
