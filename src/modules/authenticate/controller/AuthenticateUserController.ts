import { compare } from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../../config";
import { AppError } from "../../../error";
import { UserRepository } from "../../users/repositories";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export class AuthenticateUserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userExists = await this.userRepository.findUserByEmail(email);
    if (!userExists) {
      throw new AppError("Password or email Incorrect", 404);
    }

    const passwordMatch = await compare(password, userExists.password);
    if (!passwordMatch) {
      throw new AppError("Password or email Incorrect", 404);
    }

    console.log(jwtConfig);

    const token = jwt.sign({ userId: userExists.id }, jwtConfig().secret, {
      expiresIn: jwtConfig().expiresIn,
    });

    const response: IResponse = {
      user: { name: userExists.name, email: userExists.email },
      token,
    };

    return res.json(response);
  }
}
