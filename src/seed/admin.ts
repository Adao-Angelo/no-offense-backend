import { hash } from "bcrypt";
import dotenv from "dotenv";
import { UserRepository } from "../modules/users/repositories";

dotenv.config();

const userRepository = new UserRepository();

export async function createAdmin() {
  const adminName = process.env.ADMIN_NAME as string;
  const adminEmail = process.env.ADMIN_EMAIL as string;
  const adminPassword = await hash(process.env.ADMIN_PASSWORD as string, 10);

  const admin = await userRepository.createUser({
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    admin: true,
  });

  console.log(admin);
}

createAdmin();
