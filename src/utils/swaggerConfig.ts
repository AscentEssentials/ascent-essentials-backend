const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;

export const generateSwaggerDocs = () => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Ascent Essentials - Backend API",
        version: "0.1.0",
        description: "Documentation for Ascent Essentials backend",
        servers: [`http://localhost:${port}`],
      },
    },
    // Path to the API docs
    apis: ["./src/routes/*.ts", "./src/models/*.ts"],
  };

  return swaggerJsdoc(swaggerOptions);
};

export const serveSwaggerUi = () => {
  return swaggerUi.serve;
};

export const setupSwaggerUi = (swaggerDocs: any) => {
  return swaggerUi.setup(swaggerDocs);
};
