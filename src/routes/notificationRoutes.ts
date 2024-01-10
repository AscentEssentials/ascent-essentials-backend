import express from "express";
import { authenticateUser, isAdmin } from "../middleware/authentication";
import { NotificationController } from "../controllers/notificationController";

/**
 * Express Router to handle notifications related routes.
 * @swagger
 * tags:
 *   name: Notification
 *   description: API endpoints to handle notifications related routes.
 *
 */

const router = express.Router();

/**
 * @swagger
 * /notifications:
 *   get:
 *     tags: [Notification]
 *     summary: Get all notifications of the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all notifications of the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/notifications",
  authenticateUser,
  NotificationController.getAllNotificationsOfActualUser
);

/**
 * @swagger
 * /admin/notifications:
 *   get:
 *     tags: [Notification]
 *     summary: Get all admin notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all admin notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notification'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "admin/notifications",
  authenticateUser,
  isAdmin,
  NotificationController.getAllAdminNotifications
);

/**
 * @swagger
 * /notifications/{notificationId}:
 *   delete:
 *     tags: [Notification]
 *     summary: Delete a specific notification. The user can only delete his own notifications.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the notification to be deleted
 *     responses:
 *       204:
 *         description: Notification successfully deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden. Only the recipient can delete the notification.
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/notifications/:notificationId",
  authenticateUser,
  NotificationController.deleteNotificationOfActualUser
);

/**
 * @swagger
 * /admin/notifications/{notificationId}:
 *   delete:
 *     tags: [Notification]
 *     summary: Delete a specific admin notification (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the admin notification to be deleted
 *     responses:
 *       204:
 *         description: Admin notification successfully deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Admin notification not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "admin/notifications/:notificationId",
  authenticateUser,
  isAdmin,
  NotificationController.deleteAdminNotification
);

export default router;
