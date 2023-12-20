import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger setup
const swaggerOptions = {
    definition: {
      openapi: '3.0.3',
      info: {
        title: 'Ascent Essentials - Backend API',
        version: '0.1.0',
        description: 'Documentation for Ascent Essentials backend',
        servers: [`http://localhost:${process.env.PORT || 3000}`],
      },
    },
    // Path to the API docs
    apis: ['./routes/*.ts'],
};

// auto generated swagger docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

export default app;
