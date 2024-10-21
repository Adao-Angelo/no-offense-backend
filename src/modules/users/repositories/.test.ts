// src/tests/userRepository.test.ts
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { UserRepository } from "./";
import { prisma } from "../../../config";

const userRepository = new UserRepository();

describe("UserRepository", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should create a user", async () => {
    const user = await userRepository.createUser({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    expect(user).toHaveProperty("id");
    expect(user.email).toBe("john.doe@example.com");
  });

  it("should find a user by email", async () => {
    const user = await userRepository.findUserByEmail("john.doe@example.com");
    expect(user).toHaveProperty("email", "john.doe@example.com");
  });

  it("should update a user", async () => {
    const user = await userRepository.createUser({
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: "password123",
    });

    const updatedUser = await userRepository.updateUser(user.id, {
      name: "Jane Updated",
    });

    expect(updatedUser.name).toBe("Jane Updated");
  });

  it("should delete a user", async () => {
    const user = await userRepository.createUser({
      name: "Delete Me",
      email: "delete.me@example.com",
      password: "password123",
    });

    const deleteUser = await userRepository.deleteUser(user.id);
    expect(deleteUser).toHaveProperty("id", user.id);
  });
});
