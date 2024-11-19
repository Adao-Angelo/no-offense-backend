import { Router } from "express";
import userRoutes from "./userRoutes";
import publicationRoutes from "./publicationRoutes";
import commentRoutes from "./commentRoutes";
import authRoutes from "./authRoutes";
import verify from "./verifyRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/publications", publicationRoutes);
router.use("/comments", commentRoutes);
router.use("/auth", authRoutes);
router.use("/verify", verify);

export default router;
