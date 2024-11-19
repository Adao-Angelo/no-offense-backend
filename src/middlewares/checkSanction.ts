import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma";
import { AppError } from "../error";

export const checkSanction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;

  const sanction = await prisma.sanction.findUnique({
    where: { userId },
  });

  if (!sanction) {
    await prisma.sanction.create({
      data: {
        userId,
      },
    });
    return next();
  }

  if (
    sanction.isBanned &&
    sanction.banUntil &&
    new Date() < sanction.banUntil
  ) {
    const timeRemaining =
      (sanction.banUntil.getTime() - new Date().getTime()) / 1000 / 60;

    throw new AppError(
      `You are banned due to offensive behavior. Please wait ${Math.ceil(
        timeRemaining
      )} minutes to comment again.`,
      403
    );
  }

  if (sanction.banUntil) {
    if (sanction.isBanned && new Date() > sanction.banUntil) {
      await prisma.sanction.update({
        where: { id: sanction.id },
        data: {
          isBanned: false,
          banUntil: null,
          alerts: 0,
        },
      });
    }
  }

  next();
};
