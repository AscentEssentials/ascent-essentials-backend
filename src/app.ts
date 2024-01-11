import express, { Express } from "express";
import routes from "./routes/routes";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

const app: Express = express();
const server = http.createServer(app); // Create an HTTP server, needed for Socket.IO

// Middleware to parse JSON in the request body
app.use(express.json());

// CORS
app.use(cors());

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

// Create a Socket.IO server and attach it to the HTTP server
export const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export default server;
