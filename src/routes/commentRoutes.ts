import { Router } from "express";
import { prisma } from "../config/prisma";
import { AppError } from "../error/appError";
import { ensureAuthenticated } from "../middlewares";
import { evaluateComment } from "../services";
import { checkSanction } from "../middlewares/checkSanction";

const CommentsRouter = Router();

CommentsRouter.use(ensureAuthenticated);

CommentsRouter.post("/", checkSanction, async (request, response) => {
  const userId = request.user.id;
  const { publicationId, text } = request.body;

  const publication = await prisma.publications.findUnique({
    where: { id: publicationId },
  });

  if (!publication) {
    throw new AppError("Publication not found", 404);
  }

  const imageDescription = publication.imageDescription || "";
  const postDescription = publication.text;
  const comment = text;

  const evaluation = await evaluateComment(
    imageDescription,
    postDescription,
    comment
  );

  const isOffensive =
    evaluation.split(",")[0] == "Yes" || evaluation.split(",")[0] == "yes"
      ? true
      : false;
  if (isOffensive) {
    const sanction = await prisma.sanction.update({
      where: { userId },
      data: {
        alerts: { increment: 1 },
      },
    });

    if (sanction.alerts >= 3) {
      await prisma.sanction.update({
        where: { userId },
        data: {
          isBanned: true,
          banUntil: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        },
      });
      throw new AppError(
        "You have been banned for 24 hours due to offensive behavior.",
        403
      );
    }

    throw new AppError(
      "Comment detected as offensive. This is your ${sanction.alerts}th warning.",
      400
    );
  } else {
    try {
      await prisma.comments.create({
        data: {
          userId,
          publicationId,
          text,
        },
      });
    } catch {
      throw new AppError("Error on create comment");
    }
    response.status(201).json({ message: "comment created" });
  }
});

CommentsRouter.get("/", async (request, response) => {
  const userId = request.user.id;
  const comments = await prisma.comments.findMany({
    where: { userId },
    include: { publication: true },
  });
  response.json(comments);
});

export default CommentsRouter;
