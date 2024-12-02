import { Request, Response } from "express";
import { AppError } from "../../../error";
import { fetchImageDescription } from "../../../services";
import type { UserRepository } from "../../users/repositories";
import { PublicationRepository } from "../repository/PublicationRepository";

export class PublicationController {
  constructor(
    private publicationRepository: PublicationRepository,
    private userRepository: UserRepository
  ) {}

  async create(req: Request, res: Response) {
    const userId = req.user.id;
    const { text, imageUrl } = req.body;

    let imageDescription = "";

    if (imageUrl && imageUrl.length > 5 && imageUrl !== "") {
      imageDescription = await fetchImageDescription(imageUrl);
      console.log(imageDescription);
    }

    const publication = await this.publicationRepository.create({
      text,
      imageUrl,
      imageDescription,
      userId,
    });

    return res
      .status(201)
      .json({ message: "Publication created", publication });
  }

  async getAll(req: Request, res: Response) {
    const publications = await this.publicationRepository.findAll();

    const users = await this.userRepository.findAllUsers();

    const publicationsWithUsers = publications.map((publication) => {
      const user = users.find((u) => u.id === publication.userId);

      if (!user) {
        throw new AppError("User not found for publication", 404);
      }

      return {
        id: publication.id,
        text: publication.text,
        imageUrl: publication.imageUrl,
        imageDescription: publication.imageDescription,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    });

    return res.status(200).json(publicationsWithUsers);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const publication = await this.publicationRepository.findById(id);

    if (!publication) {
      throw new AppError("Publication not found", 404);
    }

    await this.publicationRepository.delete(id);

    return res.status(204).send();
  }
}
