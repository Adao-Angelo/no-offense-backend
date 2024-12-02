import { AppError } from "../error/appError";
import { CommentRepository } from "../modules/comments/repository/CommentRepository";
import { evaluateComment } from "../services";

export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async createComment(userId: string, publicationId: string, text: string) {
    const publication = await this.commentRepository.findPublicationById(
      publicationId
    );

    if (!publication) {
      throw new AppError("Publication not found", 404);
    }

    const evaluation = await evaluateComment(
      publication.imageDescription || "",
      publication.text,
      text
    );

    const isOffensive = evaluation.split(",")[0].toLowerCase() === "yes";

    if (isOffensive) {
      const sanction = await this.commentRepository.updateSanction(
        userId,
        true,
        false
      );

      if (sanction.alerts >= 3) {
        await this.commentRepository.updateSanction(userId, false, true);
        throw new AppError(
          "You have been banned for 24 hours due to offensive behavior.",
          403
        );
      }

      throw new AppError(
        `Comment detected as offensive. This is your ${sanction.alerts}th warning.`,
        400
      );
    }

    return await this.commentRepository.create({ userId, publicationId, text });
  }

  async getCommentsByUser(userId: string) {
    return await this.commentRepository.findByUserId(userId);
  }
}
