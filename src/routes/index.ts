import { Router } from "express";
import userRoutes from "./userRoutes";
import publicationRoutes from "./publicationRoutes";
import commentRoutes from "./commentRoutes";
import authRoutes from "./authRoutes";
import verify from "./verifyRoutes";
import sanctionRouter from "./sanctionRoutes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../docs/swagger.json";

const router = Router();

router.use("/users", userRoutes);
router.use("/publications", publicationRoutes);
router.use("/comments", commentRoutes);
router.use("/auth", authRoutes);
router.use("/verify", verify);
router.use("/sanction", sanctionRouter);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
