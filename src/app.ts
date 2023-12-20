import express, { Express } from "express";
import dotenv from "dotenv";
import routes from './routes/routes';
import { generateSwaggerDocs, serveSwaggerUi, setupSwaggerUi } from './utils/swaggerConfig';

dotenv.config();

const app: Express = express();

// Auto-generated Swagger docs
const swaggerDocs = generateSwaggerDocs();

// Serve and setup Swagger UI
app.use('/api-docs', serveSwaggerUi(), setupSwaggerUi(swaggerDocs));

// Definition of the routes
app.use('/', routes);

export default app;
