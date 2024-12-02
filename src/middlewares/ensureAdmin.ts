import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { UserRepository } from "../modules/users/repositories";
export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;
  const userRepository = new UserRepository();
  const user = await userRepository.findUserById(id);
  if (user) {
    if (!user.admin) {
      throw new AppError("User is not Admin!");
    }
  } else {
    throw new AppError("Invalid Token", 401);
  }
  return next();
}
