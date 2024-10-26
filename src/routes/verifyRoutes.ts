import { Router } from "express";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { AppError } from "../error";
import { UserRepository } from "../modules/users/repositories";
import { CreateUserDTO } from "../modules/users/ types";

const router = Router();
const userRepository = new UserRepository();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pendingUsersPath = path.join(__dirname, "../../temp/pendingUsers.json");

router.get("/", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new AppError("Token not provided", 401);
  }
  const decoded = jwt.verify(
    String(token),
    process.env.JWT_SECRET as string
  ) as { email: string };

  let pendingUsers: CreateUserDTO[] = [];
  if (fs.existsSync(pendingUsersPath)) {
    const data = fs.readFileSync(pendingUsersPath, "utf-8");
    pendingUsers = JSON.parse(data);
  }

  const userIndex = pendingUsers.findIndex((u) => u.email === decoded.email);

  if (userIndex === -1) {
    throw new Error("Invalid or expired token");
  }

  const user = pendingUsers[userIndex];

  if (!user) {
    throw new Error("Invalid or expired token");
  }

  const data: CreateUserDTO = {
    name: user.name,
    email: user.email,
    password: user.password,
  };

  pendingUsers.splice(userIndex, 1);
  fs.writeFileSync(pendingUsersPath, JSON.stringify(pendingUsers));

  const newUser = await userRepository.createUser(data);
  res.status(201).json(newUser);

  // res.redirect("https://www.google.com");
});

export default router;
