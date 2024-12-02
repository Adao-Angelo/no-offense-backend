import { prisma } from "../../../config";

export class SanctionRepository {
  async findByUserId(userId: string) {
    return await prisma.sanction.findUnique({ where: { userId } });
  }

  async findAll() {
    return await prisma.sanction.findMany();
  }
}
