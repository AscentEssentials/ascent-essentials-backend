import express from "express";
import categoryRoutes from "./categoryRoutes";
import productRoutes from "./productRoutes";
import {
  generateSwaggerDocs,
  serveSwaggerUi,
  setupSwaggerUi,
} from "../utils/swaggerConfig";
const router = express.Router();

// Auto-generated Swagger docs
const swaggerDocs = generateSwaggerDocs();

router.use("/api-docs", serveSwaggerUi(), setupSwaggerUi(swaggerDocs));
router.use("/", categoryRoutes);
router.use("/", productRoutes);

export default router;
