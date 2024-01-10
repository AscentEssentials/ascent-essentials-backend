import mongoose, { Model, Schema } from "mongoose";

// swagger comment definitions
/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         recipientId:
 *           type: string
 *           description: (Optional) The ID of the recipient user
 *         recipientRole:
 *           type: string
 *           description: The role of the recipient user. Must be either "customer" or "admin"
 *         message:
 *           type: string
 *           description: The message of the notification
 *         createdAt:
 *           type: string
 *           description: The date of creation of the notification
 *       example:
 *         recipientId: "60a9b8e5b6f9b7287418b16c"
 *         recipientRole: "customer"
 *         message: "This is a notification"
 *         createdAt: "2021-05-24T14:48:00.000Z"
 */

enum UserRole {
  Customer = "customer",
  Admin = "admin",
}

export interface INotificationDocument extends mongoose.Document {
  recipientId?: mongoose.Schema.Types.ObjectId;
  recipientRole: UserRole; // if recipientId is not provided, then the notification is sent to all users with the specified role
  message: string;
  createdAt: Date;
}

const notificationSchema = new mongoose.Schema<INotificationDocument>(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    recipientRole: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NotificationModel: Model<INotificationDocument> = mongoose.model(
  "Notification",
  notificationSchema
);

export default NotificationModel;
