import express, { Express } from "express";
import routes from "./routes/routes";

import mongoose from "mongoose";

const app: Express = express();

// Middleware to parse JSON in the request body
app.use(express.json());

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
