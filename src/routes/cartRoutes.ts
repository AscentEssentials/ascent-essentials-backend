import express from "express";
import { authenticateUser } from "../middleware/authentication";
import CartController from "../controllers/cartController";

/**
 * Express router for handling cart related routes.
 * @swagger
 * tags:
 *   name: Cart
 *   description: API endpoints for managing cart
 */

const router = express.Router();

/**
 * @swagger
 * /cart:
 *   get:
 *     tags: [Cart]
 *     summary: Get cart details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/cart", authenticateUser, CartController.getUserCart);

/**
 * @swagger
 * /cart/add:
 *   post:
 *     tags: [Cart]
 *     summary: Add a product to cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Product ID and quantity
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartRequest'
 *     responses:
 *       200:
 *         description: Returns cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
//router.post("/cart/add", authenticateUser, CartController.addToCart);

/**
 * @swagger
 * /cart/update:
 *   put:
 *     tags: [Cart]
 *     summary: Update cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Product ID and quantity
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartRequest'
 *     responses:
 *       200:
 *         description: Returns cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
//router.put("/cart/update", authenticateUser, CartController.updateCart);

/**
 * @swagger
 * /cart/remove:
 *   delete:
 *     tags: [Cart]
 *     summary: Remove a product from cart
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Product ID
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartRequest'
 *     responses:
 *       200:
 *         description: Returns cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
//router.delete("/cart/remove", authenticateUser, CartController.removeFromCart);

/**
 * @swagger
 * /cart/clear:
 *   delete:
 *     tags: [Cart]
 *     summary: Clear cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
//router.delete("/cart/clear", authenticateUser, CartController.clearCart);

export default router;
