/**
 * UserController handles HTTP requests for user operations such as creating, retrieving, updating, and deleting users. It interacts with UserRepository for database actions, ensuring proper handling of user data and returning appropriate responses, including error handling.
 */

import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories";
import { CreateUserDTO, UpdateUserDTO } from "../ types";
import { AppError } from "../../../error";
import bcrypt from "bcrypt";

const userRepository = new UserRepository();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 8;

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const data: CreateUserDTO = req.body;

      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

      const newUser = await userRepository.createUser({
        ...data,
        password: hashedPassword,
      });

      res.status(201).json(newUser);
    } catch (error) {
      new AppError("Error creating user", 500);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userRepository.findUserById(Number(id));
      if (!user) {
        return next(new AppError("User not found", 404));
      }
      res.status(200).json(user);
    } catch (error) {
      next(new AppError("Error fetching user", 500));
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const user = await userRepository.findUserByEmail(email);
      if (!user) {
        new AppError("User not found", 404);
      }
      res.status(200).json(user);
    } catch (error) {
      new AppError("Error fetching user", 500);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: UpdateUserDTO = req.body;
      const updatedUser = await userRepository.updateUser(Number(id), data);
      res.status(200).json(updatedUser);
    } catch (error) {
      new AppError("Error updating user", 500);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await userRepository.deleteUser(Number(id));
      res.status(204).send();
    } catch (error) {
      new AppError("Error deleting user", 500);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userRepository.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      new AppError("Error fetching users", 500);
    }
  }
}
