import { Router } from "express";
import userRoutes from "./userRoutes";
import publicationRoutes from "./publicationRoutes";
import commentRoutes from "./commentRoutes";

const router = Router();

// Usando prefixos para cada grupo de rotas
router.use("/users", userRoutes); // Rotas de usuários
router.use("/publications", publicationRoutes); // Rotas de publicações
router.use("/comments", commentRoutes); // Rotas de comentários

export default router;
