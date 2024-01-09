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
 *     summary: Get all orders of the actual user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all orders of the actual user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
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
 *     summary: Get all orders of all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all orders of all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
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
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/order", authenticateUser, OrderController.addOrder);

export default router;
