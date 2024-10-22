import { Router } from "express";
import userRoutes from "./userRoutes";
import publicationRoutes from "./publicationRoutes";
import commentRoutes from "./commentRoutes";
import authRoutes from "./authRoutes";

const router = Router();

router.use("/users", userRoutes); // Rotas de usuários
router.use("/publications", publicationRoutes); // Rotas de publicações
router.use("/comments", commentRoutes); // Rotas de comentários
router.use("/auth", authRoutes); // Rotas de autenticação

export default router;
