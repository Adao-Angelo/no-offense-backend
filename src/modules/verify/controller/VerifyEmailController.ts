import { Request, Response } from "express";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import { jwtConfig } from "../../../config/";
import { AppError } from "../../../error";
import { CreateUserDTO } from "../dtos";
import { UserRepository } from "../repository/UserRepository";

export class VerifyEmailController {
  private userRepository: UserRepository;
  private pendingUsersPath: string;

  constructor() {
    this.userRepository = new UserRepository();
    this.pendingUsersPath = path.resolve("temp/pendingUsersConfirm.json");
  }

  async handle(req: Request, res: Response) {
    const { token } = req.query;

    if (!token) {
      throw new AppError("Token not provided", 401);
    }

    let decoded;
    try {
      decoded = jwt.verify(String(token), jwtConfig.secret) as {
        email: string;
      };
    } catch {
      throw new AppError("Invalid or expired token", 401);
    }

    let pendingUsers: CreateUserDTO[] = [];

    if (fs.existsSync(this.pendingUsersPath)) {
      const data = fs.readFileSync(this.pendingUsersPath, "utf-8");
      pendingUsers = JSON.parse(data);
    }

    const userIndex = pendingUsers.findIndex((u) => u.email === decoded.email);

    if (userIndex === -1) {
      throw new AppError("Invalid or expired token", 401);
    }

    const user = pendingUsers[userIndex];

    if (!user) {
      throw new AppError("Invalid or expired token", 401);
    }

    const data: CreateUserDTO = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    pendingUsers.splice(userIndex, 1);
    fs.writeFileSync(this.pendingUsersPath, JSON.stringify(pendingUsers));

    const newUser = await this.userRepository.createUser(data);

    return res.status(201).json(newUser);

    // Uncomment to redirect after verification
    // res.redirect("https://www.google.com");
  }
}
