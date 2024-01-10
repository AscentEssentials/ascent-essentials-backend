import server, { io } from "./app";
import dotenv from "dotenv";
import { handleClientLogin, handleUserDisconnect } from "./utils/socket";

dotenv.config();

export const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for client login event
  socket.on("client-login", (token) => {
    handleClientLogin(socket, token);
  });

  // Listen for disconnect event
  socket.on("disconnect", () => {
    handleUserDisconnect(socket);
  });
});
