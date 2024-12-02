import { Router } from "express";
import authRoutes from "./authRoutes";
import commentRoutes from "./commentRoutes";
import publicationRoutes from "./publicationRoutes";
import sanctionRouter from "./sanctionRoutes";
import userRoutes from "./userRoutes";
import verifyEmail from "./verifyRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../docs/swagger.json";

const router = Router();

router.use("/users", userRoutes);
router.use("/publications", publicationRoutes);
router.use("/comments", commentRoutes);
router.use("/auth", authRoutes);
router.use("/verifyEmail", verifyEmail);
router.use("/sanction", sanctionRouter);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
