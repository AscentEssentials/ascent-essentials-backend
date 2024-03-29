import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authentication";
import NotificationModel, {
  INotificationDocument,
  UserRole,
} from "../models/notificationModel";
import { IUserDocument } from "../models/userModel";
import mongoose from "mongoose";
import {
  SocketEvent,
  emitEventToAdmins,
  emitEventToUser,
} from "../utils/socket";

/**
 * Controller for handling notifications related operations.
 */
export class NotificationController {
  /**
   * Get all notifications of the authenticated user.
   */
  static async getAllNotificationsOfActualUser(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user as IUserDocument;
      const userId = user._id;

      // Fetch all notifications of the user
      const notifications: INotificationDocument[] =
        await NotificationModel.find({
          recipientId: userId,
        }).sort({ createdAt: -1 });

      // Response to respect the Notification schema
      const response = notifications.map((notification) =>
        NotificationController.mapNotificationToResponse(notification)
      );

      res.status(200).send(response);
    } catch (error) {
      console.error(
        "[NotificationController] Error fetching user notifications:",
        error
      );
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Get all admin notifications.
   */
  static async getAllAdminNotifications(
    _: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      // Find all notifications with recipientRole = "admin"
      const notifications: INotificationDocument[] =
        await NotificationModel.find({
          recipientRole: UserRole.Admin,
        }).sort({ createdAt: -1 });

      // Response to respect the Notification schema
      const response = notifications.map((notification) =>
        NotificationController.mapNotificationToResponse(notification)
      );

      res.status(200).send(response);
    } catch (error) {
      console.error(
        "[NotificationController] Error fetching admin notifications:",
        error
      );
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Delete a notification of the authenticated user.
   */
  static async deleteNotificationOfActualUser(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user as IUserDocument;
      const userId = user._id;
      const notificationId = req.params.notificationId;

      // Find the notification
      const notification: INotificationDocument | null =
        await NotificationModel.findById(notificationId);

      if (!notification) {
        res.status(404).json({ error: "Notification not found" });
        return;
      }

      // Check if the authenticated user is the recipient of the notification
      if (String(notification.recipientId) !== String(userId)) {
        res.status(403).json({ error: "Permission denied" });
        return;
      }

      // Delete the notification
      await notification.deleteOne();

      res.status(204).send();
    } catch (error) {
      console.error(
        "[NotificationController] Error deleting notification:",
        error
      );
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Delete an admin notification.
   */
  static async deleteAdminNotification(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const notificationId = req.params.notificationId;

      // Find the notification
      const notification: INotificationDocument | null =
        await NotificationModel.findById(notificationId);

      if (!notification) {
        res.status(404).json({ error: "Notification not found" });
        return;
      }

      // Check if the recipientRole is "admin"
      if (notification.recipientRole !== UserRole.Admin) {
        res.status(403).json({ error: "Permission denied" });
        return;
      }

      // Delete the notification
      await notification.deleteOne();

      res.status(204).send();
    } catch (error) {
      console.error(
        "[NotificationController] Error deleting notification:",
        error
      );
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Function to create a notification.
   */
  static async createNotification(
    recipientId: mongoose.Schema.Types.ObjectId | undefined, // make it optional
    recipientRole: UserRole,
    message: string
  ): Promise<void> {
    try {
      await NotificationModel.create({
        recipientId,
        recipientRole,
        message,
      });

      // Check if recipientId is provided and emit the notification
      if (recipientId) {
        emitEventToUser(String(recipientId), SocketEvent.NewNotification, {
          message,
        });
      } else if (recipientRole === UserRole.Admin) {
        // Emit the notification to all admin users
        emitEventToAdmins(SocketEvent.NewNotification, { message });
      }
    } catch (error) {
      console.error(
        "[NotificationController] Error creating notification:",
        error
      );
    }
  }

  /**
   * Private function to map an INotificationDocument to a response object respecting the Notification schema.
   */
  private static mapNotificationToResponse(
    notification: INotificationDocument
  ) {
    return {
      _id: notification._id,
      message: notification.message,
      createdAt: notification.createdAt,
    };
  }
}
