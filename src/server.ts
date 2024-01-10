import server, { io } from "./app";
import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
