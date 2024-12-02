import { Request, Response } from "express";
import { AppError } from "../../../error";
import { SanctionRepository } from "../repository/SanctionRepository";

export class SanctionController {
  constructor(private sanctionRepository: SanctionRepository) {}

  async getByUserId(req: Request, res: Response) {
    const userId = req.user.id;

    const sanction = await this.sanctionRepository.findByUserId(userId);

    if (!sanction) {
      throw new AppError("Sanction not found", 404);
    }

    return res.status(200).json(sanction);
  }

  async getAll(req: Request, res: Response) {
    try {
      const sanctions = await this.sanctionRepository.findAll();

      if (!sanctions.length) {
        return res.status(200).json([]);
      }

      return res.status(200).json(sanctions);
    } catch (error) {
      throw new AppError("Error fetching sanctions", 500);
    }
  }
}
