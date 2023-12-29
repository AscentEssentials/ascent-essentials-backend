import express, { Response } from "express";
import categoryRoutes from "./categoryRoutes";
import productRoutes from "./productRoutes";
import mongoose from "mongoose";
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

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: The backend is up and running
 *       503:
 *         description: The backend is currently unavailable
 */
router.get("/health", async (_, res: Response) => {
  try {
    // Check the MongoDB connection
    await mongoose.connection.db.admin().ping();

    // Respond with 200 if the MongoDB connection is successful
    res.status(200).send("The backend is up and running");
  } catch (error) {
    // Respond with 503 if there is an issue with the MongoDB connection
    res.status(503).send("The backend is currently unavailable");
  }
});

// Catch undefined routes
router.use("*", (_, res: Response) => {
  res.status(404).send("Not Found");
});

export default router;
