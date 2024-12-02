import { prisma } from "../../../config";
import { CreateUserDTO } from "../dtos";

export class UserRepository {
  async createUser(data: CreateUserDTO) {
    return await prisma.users.create({ data });
  }
}
