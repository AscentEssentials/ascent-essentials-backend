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
        version: "7.0.0",
        description: "Documentation for Ascent Essentials backend",
        servers: [`http://localhost:${port}`],
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    // Path to the API docs
    apis: ["./src/routes/*.ts", "./src/models/*.ts"],
  };

  return swaggerJsdoc(swaggerOptions);
};

export const serveSwaggerUi = () => {
  console.log(`[server]: Docs available at http://localhost:${port}/api-docs`);
  return swaggerUi.serve;
};

export const setupSwaggerUi = (swaggerDocs: any) => {
  return swaggerUi.setup(swaggerDocs, {
    swaggerOptions: {
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
  });
};
