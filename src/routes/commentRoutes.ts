import { Router } from "express";
import { prisma } from "../config/prisma";
import { AppError } from "../error/appError";
import { ensureAuthenticated } from "../middlewares";

const CommentsRouter = Router();

CommentsRouter.use(ensureAuthenticated);

CommentsRouter.post("/", async (request, response) => {
  const userId = request.user.id;
  const { publicationId, text } = request.body;

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
});

export default CommentsRouter;
