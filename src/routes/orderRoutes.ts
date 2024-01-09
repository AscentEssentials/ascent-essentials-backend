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
router.get("/orders", authenticateUser, OrderController.getAllOrdersOfActualUser);

export default router;
