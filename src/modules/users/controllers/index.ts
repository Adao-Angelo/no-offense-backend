/**
 * UserController handles HTTP requests for user operations such as creating, retrieving, updating, and deleting users. It interacts with UserRepository for database actions, ensuring proper handling of user data and returning appropriate responses, including error handling.
 */

import { Request, Response } from "express";
import { UserRepository } from "../repositories";
import { CreateUserDTO, UpdateUserDTO } from "../ types";
import { AppError } from "../../../error";
import bcrypt from "bcrypt";

const userRepository = new UserRepository();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 8;

export class UserController {
  async createUser(req: Request, res: Response) {
    const data: CreateUserDTO = req.body;

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const user = await userRepository.findUserByEmail(data.email);
    if (user) {
      throw new AppError("User email already Exists");
    }

    const newUser = await userRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    res.status(201).json(newUser);

    if (!newUser) {
      throw new AppError("Error on create a user", 404);
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userRepository.findUserById(id);
    if (!user) {
      return new AppError("User not found", 404);
    }
    res.status(200).json(user);
  }

  async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      new AppError("User not found", 404);
    }
    res.status(200).json(user);
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const data: UpdateUserDTO = req.body;
    const updatedUser = await userRepository.updateUser(id, data);
    res.status(200).json(updatedUser);
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    await userRepository.deleteUser(id);
    res.status(204).send();
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await userRepository.findAllUsers();
    res.status(200).json(users);
  }
}
