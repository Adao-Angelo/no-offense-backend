import { prisma } from "../../../config";
import { CreatePublicationDTO } from "../dtos/";

export class PublicationRepository {
  async create({
    text,
    imageUrl,
    userId,
    imageDescription,
  }: CreatePublicationDTO) {
    return await prisma.publications.create({
      data: { text, imageUrl, imageDescription, userId },
    });
  }

  async findAll() {
    return await prisma.publications.findMany();
  }

  async findById(id: string) {
    return await prisma.publications.findFirst({ where: { id } });
  }

  async delete(id: string) {
    return await prisma.publications.delete({ where: { id } });
  }
}
