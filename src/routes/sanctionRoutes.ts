import { Router } from "express";
import { prisma } from "../config/prisma";
import { AppError } from "../error/appError";
import { ensureAuthenticated } from "../middlewares";

const sanctionRouter = Router();

sanctionRouter.use(ensureAuthenticated);

sanctionRouter.get("/user", async (request, response) => {
  const userId = request.user.id;

  const sanction = await prisma.sanction.findUnique({
    where: { userId },
  });

  if (!sanction) {
    throw new AppError("Sanction not found", 404);
  }

  response.status(200).json(sanction);
});

export default sanctionRouter;
sanctionRouter.get("/", async (request, response) => {
  try {
    const sanctions = await prisma.sanction.findMany();

    if (!sanctions.length) {
      response.status(200).json([]);
    }

    response.status(200).json(sanctions);
  } catch (error) {
    throw new AppError("Error fetching sanctions", 500);
  }
});
