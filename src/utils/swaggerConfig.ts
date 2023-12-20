const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

export const generateSwaggerDocs = () => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "Ascent Essentials - Backend API",
        version: "0.1.0",
        description: "Documentation for Ascent Essentials backend",
        servers: [`http://localhost:${process.env.PORT || 3000}`],
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
