import { Router } from "express";
import { prisma } from "../config/prisma";
import { compare } from "bcrypt";
import { AppError } from "../error/appError";
import jwt from "jsonwebtoken";

const router = Router();

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

router.post("/", async (req, res) => {
  /** get email and password of request body */
  const { password, email } = req.body;

  /** find user by email */
  const userExists = await prisma.users.findUnique({ where: { email } });

  if (!userExists) {
    throw new AppError("Password or email Incorrect", 404);
  }
  /** compare password with hashed password in database */
  const passwordMatch = await compare(password, userExists.password);
  if (!passwordMatch) {
    throw new AppError("Password or email Incorrect", 404);
  }

  /** generate token */
  const token = jwt.sign(
    { userId: userExists.id },
    process.env.JWT_SECRET || "noOffense",
    {
      expiresIn: "1d",
    }
  );
  /** return user object and token */
  const response: IResponse = {
    user: { name: userExists.name, email: userExists.email },
    token,
  };

  res.json(response);
});

export default router;
