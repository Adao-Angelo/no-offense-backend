import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../modules/users/repositories";
import jwt from "jsonwebtoken";
import { AppError } from "../error";

interface IPayLoad {
  sub: string;
}
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: userId } = jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    ) as IPayLoad;

    const userRepository = new UserRepository();
    const user = userRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }
    request.user = {
      id: userId,
    };
    next();
  } catch {
    throw new AppError("Invalid Token", 401);
  }
}
