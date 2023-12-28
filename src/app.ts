import express, { Express } from "express";
import routes from "./routes/routes";
import {
  generateSwaggerDocs,
  serveSwaggerUi,
  setupSwaggerUi,
} from "./utils/swaggerConfig";
const mongoose = require("mongoose");

const app: Express = express();

// Auto-generated Swagger docs
const swaggerDocs = generateSwaggerDocs();

// Serve and setup Swagger UI
app.use("/api-docs", serveSwaggerUi(), setupSwaggerUi(swaggerDocs));

// Definition of the routes
app.use("/", routes);

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017";

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("[mongoose]: Connected to the database");
  })
  .catch((err: any) => {
    console.log("[mongoose]: Error connecting to the database", err);
  });

export default app;
