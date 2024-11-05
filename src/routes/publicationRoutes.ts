import { Router } from "express";
import { fetchImageDescription } from "../services/fetchImageDescription";
import { prisma } from "../config/prisma";
import { AppError } from "../error/appError";
import { ensureAuthenticated } from "../middlewares";

const publicationRouter = Router();

publicationRouter.use(ensureAuthenticated);

publicationRouter.post("/", async (req, res) => {
  const userId = req.user.id;
  const { text, imageUrl } = req.body;

  let imageDescription = "";

  if (imageUrl && imageUrl.length > 5 && imageUrl != "") {
    imageDescription = await fetchImageDescription(imageUrl);
    console.log(imageDescription);
  }

  // Save the image description and user_id to a database or file

  await prisma.publications.create({
    data: { text, imageUrl, imageDescription, userId },
  });

  res.status(201).json({ message: "publication created" });
});

publicationRouter.get("/", async (req, res) => {
  const publications = await prisma.publications.findMany();

  const users = await prisma.users.findMany();

  const publicationsWithUsers: {
    user: any;
    publication: any;
  }[] = [];

  publications.map((publication) => {
    const userMakePublication = users.filter(
      (user) => (user.id = publication.id)
    );

    const publicationWithUser = {
      user: userMakePublication[0],
      publication,
    };
    publicationsWithUsers.push(publicationWithUser);
  });

  res.status(200).json(publicationsWithUsers);
});

publicationRouter.delete("/:id", async (req, res) => {
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

export default publicationRouter;
