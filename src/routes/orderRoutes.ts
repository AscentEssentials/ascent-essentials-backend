import express from "express";
import { authenticateUser, isAdmin } from "../middleware/authentication";
import OrderController from "../controllers/orderController";

/**
 * Express Router to handle orders related routes.
 * @swagger
 * tags:
 *   name: Order
 *   description: API endpoints for managing orders.
 *
 */

const router = express.Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Order]
 *     summary: Get all orders of the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all orders of the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get(
  "/orders",
  authenticateUser,
  OrderController.getAllOrdersOfActualUser
);

/**
 * @swagger
 * /admin/orders:
 *   get:
 *     tags: [Order]
 *     summary: Get all orders or details of a specific order (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: orderId
 *         schema:
 *           type: string
 *         description: (Optional) The ID of the order to retrieve. If not provided, returns all orders.
 *     responses:
 *       200:
 *         description: Returns all orders or details of the specified order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden. Only admin users have access.
 *       404:
 *         description: Order not found (if orderId is provided)
 *       500:
 *         description: Internal server error
 */
router.get(
  "/admin/orders",
  authenticateUser,
  isAdmin,
  OrderController.getAllOrders
);

/**
 * @swagger
 * /order:
 *   post:
 *     tags: [Order]
 *     summary: Add a new order, taking the products from the user's cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingCosts:
 *                 type: number
 *             required:
 *               - shippingCosts
 *     responses:
 *       201:
 *         description: Order successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/order", authenticateUser, OrderController.addOrder);

/**
 * @swagger
 * /admin/orders/user/{userId}:
 *   get:
 *     tags: [Order]
 *     summary: Get all orders of a specific user (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user whose orders need to be retrieved
 *     responses:
 *       200:
 *         description: Returns all orders of the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden. Only admin users have access.
 *       500:
 *         description: Internal server error
 */
router.get(
  "/admin/orders/user/:userId",
  authenticateUser,
  isAdmin,
  OrderController.getAllOrdersOfUser
);

/**
 * @swagger
 * /admin/orders/{orderId}/status:
 *   patch:
 *     tags: [Order]
 *     summary: Edit the status of a specific order (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order whose status needs to be edited
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *             required:
 *               - status
 *         description: The new status to be set for the order
 *     responses:
 *       200:
 *         description: Order status successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden. Only admin users have access.
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/admin/orders/:orderId/status",
  authenticateUser,
  isAdmin,
  OrderController.updateOrderStatus
);

/**
 * @swagger
 * /admin/orders/{orderId}:
 *   delete:
 *     tags: [Order]
 *     summary: Delete a specific order (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the order to be deleted
 *     responses:
 *       204:
 *         description: Order successfully deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden. Only admin users have access.
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/admin/orders/:orderId",
  authenticateUser,
  isAdmin,
  OrderController.deleteOrder
);

export default router;
