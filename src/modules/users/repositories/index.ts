/**
 * UserRepository interacts with the database to handle CRUD operations for users.
 * It uses Prisma to perform actions such as creating a new user, finding users by ID or email,
 * updating user details, deleting a user, and fetching all users.
 */

import { prisma } from "../../../config/prisma";
import { CreateUserDTO, UpdateUserDTO } from "../dtos";

export class UserRepository {
  async createUser({ name, email, password, admin }: CreateUserDTO) {
    return await prisma.users.create({
      data: { name, email, password, admin },
    });
  }

  async findUserById(id: string) {
    return await prisma.users.findUnique({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return await prisma.users.findUnique({
      where: { email },
    });
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    return await prisma.users.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string) {
    return await prisma.users.delete({
      where: { id },
    });
  }

  async findAllUsers() {
    return await prisma.users.findMany();
  }
}
