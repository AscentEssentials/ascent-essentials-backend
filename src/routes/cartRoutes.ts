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
 *               $ref: '#/components/schemas/Cart'
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
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to add to the cart
 *     responses:
 *       200:
 *         description: Returns cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.post("/cart/add", authenticateUser, CartController.addToCart);

/**
 * @swagger
 * /cart/update:
 *   put:
 *     tags: [Cart]
 *     summary: Update the quantity of a product in the cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product in the cart to update
 *       - in: query
 *         name: quantity
 *         required: true
 *         schema:
 *           type: integer
 *         description: The new quantity of the product in the cart
 *     responses:
 *       200:
 *         description: Returns updated cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request or invalid product ID or quantity
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in the cart
 *       500:
 *         description: Internal server error
 */
router.put(
  "/cart/update",
  authenticateUser,
  CartController.updateCartItemQuantity
);

/**
 * @swagger
 * /cart/remove:
 *   delete:
 *     tags: [Cart]
 *     summary: Remove a product from the cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to remove from the cart
 *     responses:
 *       200:
 *         description: Returns updated cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request or invalid product ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in the cart
 *       500:
 *         description: Internal server error
 */
router.delete("/cart/remove", authenticateUser, CartController.removeFromCart);

/**
 * @swagger
 * /cart/clear:
 *   delete:
 *     tags: [Cart]
 *     summary: Remove all products from cart
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns cart details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.delete("/cart/clear", authenticateUser, CartController.clearCart);

export default router;
