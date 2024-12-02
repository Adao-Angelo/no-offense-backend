import { prisma } from "../../../config";
import { CreateCommentDTO } from "../dtos";

export class CommentRepository {
  async create(data: CreateCommentDTO) {
    return await prisma.comments.create({ data });
  }

  async findByUserId(userId: string) {
    return await prisma.comments.findMany({
      where: { userId },
      include: { publication: true },
    });
  }

  async findPublicationById(publicationId: string) {
    return await prisma.publications.findUnique({
      where: { id: publicationId },
    });
  }

  async updateSanction(userId: string, incrementAlert: boolean, ban: boolean) {
    const updateData: Record<string, any> = {};

    if (incrementAlert) {
      updateData.alerts = { increment: 1 };
    }

    if (ban) {
      updateData.isBanned = true;
      updateData.banUntil = new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      );
    }

    return await prisma.sanction.update({
      where: { userId },
      data: updateData,
    });
  }
}
