import { Socket } from "socket.io";
import { getUserIdFromToken } from "../middleware/authentication";

// Keep track of connected users and their sockets
const connectedUsers = new Map<string, Socket>();

// Handle client login event
export const handleClientLogin = (socket: Socket, token: string) => {
  try {
    const userId = getUserIdFromToken(token);

    // Associate the socket with the user
    connectedUsers.set(userId, socket);

    console.log(`User with ID ${userId} authenticated and connected`);
  } catch (error) {
    console.error("Error during client login:", error);
  }
};

// Handle user disconnect event
export const handleUserDisconnect = (socket: Socket) => {
  console.log("User disconnected");

  // Find the user associated with the disconnected socket and remove the association
  connectedUsers.forEach((value, key) => {
    if (value === socket) {
      connectedUsers.delete(key);
      console.log(`User with ID ${key} disconnected`);
    }
  });
};
