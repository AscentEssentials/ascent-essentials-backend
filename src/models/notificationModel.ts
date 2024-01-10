import mongoose, { Model, Schema } from "mongoose";

// swagger comment definitions
/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the notification
 *         message:
 *           type: string
 *           description: The message of the notification
 *         createdAt:
 *           type: string
 *           description: The date of creation of the notification
 *       example:
 *         _id: 60ab2b4f6d4b0a0015f6d4b0
 *         message: "This is a notification"
 *         createdAt: "2021-05-24T14:48:00.000Z"
 */

export enum UserRole {
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
