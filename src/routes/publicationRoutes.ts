import { Router } from "express";
import { fetchImageDescription } from "../services/fetchImageDescription";
import { prisma } from "../config/prisma";
import { AppError } from "../error/appError";

const router = Router();

router.post("/", async (req, res) => {
  const { text, url } = req.body;
  const imageDescription = await fetchImageDescription(url);
  const userId = "00f57bca-68a5-4337-a6b3-515c73ae4313";

  console.log(imageDescription);

  // Save the image description and user_id to a database or file

  await prisma.publications.create({
    data: { text, imageUrl: url, imageDescription, userId },
  });

  res.status(200).json({ message: "publication created" });
});

router.get("/", async (req, res) => {
  const publications = await prisma.publications.findMany();
  res.status(200).json(publications);
});

router.delete("/:id", async (req, res) => {
  /** get a id id request */
  const { id } = req.params;

  const publication = await prisma.publications.findFirst({ where: { id } });

  if (!publication) {
    throw new AppError("publication not found", 404);
  }

  /** delete publication by id */
  await prisma.publications.delete({ where: { id } });

  /** send a 204 status code to indicate that the resource has been deleted */
  res.status(204).send();
});

export default router;
