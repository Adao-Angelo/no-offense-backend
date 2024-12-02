/**
 * UserController handles HTTP requests for user operations such as creating, retrieving, updating, and deleting users. It interacts with UserRepository for database actions, ensuring proper handling of user data and returning appropriate responses, including error handling.
 */

import bcrypt from "bcrypt";
import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import { AppError } from "../../../error";
import { SendVerificationEmails } from "../../../services";
import { CreateUserDTO, UpdateUserDTO } from "../dtos";
import { UserRepository } from "../repositories";

const userRepository = new UserRepository();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 8;

const pendingUsersPath = path.resolve("temp/pendingUsersConfirm.json");

export class UserController {
  async createUser(req: Request, res: Response) {
    const data: CreateUserDTO = req.body;

    const user = await userRepository.findUserByEmail(data.email);
    if (user) {
      throw new AppError("User email already Exists");
    }

    let pendingUsers: CreateUserDTO[] = [];

    if (fs.existsSync(pendingUsersPath)) {
      const data = fs.readFileSync(pendingUsersPath, "utf-8");
      pendingUsers = JSON.parse(data);
    }

    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const token = jwt.sign(
      { email: data.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    await SendVerificationEmails(data.email, token);

    console.log(`${process.env.APP_URL}/verify?token=${token}`);

    pendingUsers = pendingUsers.filter((user) => user.email !== data.email);

    const userInPendingList = pendingUsers.filter((user) => {
      user.email === data.email;
    });

    if (userInPendingList.length > 0) {
      throw new AppError("User email already Exists");
    }

    pendingUsers.push({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    fs.writeFileSync(pendingUsersPath, JSON.stringify(pendingUsers));

    res
      .status(200)
      .json({ message: "User registered, check your email for verification" });
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
