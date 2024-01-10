import { Socket } from "socket.io";
import { getUserIdFromToken } from "../middleware/authentication";
import UserModel from "../models/userModel";

export enum SocketEvent {
  ClientLogin = "client-login",
  Disconnect = "disconnect",
  NewNotification = "new-notification",
}

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

// Function to emit an event to a user
export const emitEventToUser = (
  userId: string,
  eventName: string,
  data: any
) => {
  const socket = connectedUsers.get(userId);

  if (socket) {
    socket.emit(eventName, data);
  } else {
    console.error(
      `User with ID ${userId} is not connected. Notification will not be sent.`
    );
  }
};

// Function to emit an event to all connected admins
export const emitEventToAdmins = (eventName: string, data: any) => {
  connectedUsers.forEach(async (socket, userId) => {
    try {
      // Check if the user is an admin
      const isAdmin = await UserModel.exists({ _id: userId, isAdmin: true });

      // If the user is an admin, emit the event
      if (isAdmin) {
        socket.emit(eventName, data);
        console.log(`Event ${eventName} emitted to admin with ID ${userId}`);
      }
    } catch (error) {
      console.error(`Error emitting event to admin with ID ${userId}:`, error);
    }
  });
};
