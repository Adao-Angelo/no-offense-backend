import { Router } from "express";
import { prisma } from "../config/prisma";
import { AppError } from "../error/appError";
import { ensureAuthenticated } from "../middlewares";
import { evaluateComment } from "../services/evaluateComment";

const CommentsRouter = Router();

CommentsRouter.use(ensureAuthenticated);

CommentsRouter.post("/", async (request, response) => {
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
    throw new AppError("Offensive comment detected:", 400);
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
