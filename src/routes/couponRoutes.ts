import express from "express";
import { authenticateUser, isAdmin } from "../middleware/authentication";
import CouponController from "../controllers/couponController";

/**
 * Express router for handling coupon related routes.
 * @swagger
 * tags:
 *   name: Coupons
 *   description: API endpoints for managing coupons
 */

const router = express.Router();

/**
 * @swagger
 * /admin/coupons:
 *   get:
 *     tags: [Coupons]
 *     summary: Get all coupons (Admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns all coupons (Admin only)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 *       500:
 *         description: Internal server error
 */
router.get(
  "/admin/coupons",
  authenticateUser,
  isAdmin,
  CouponController.getAllCoupons
);

/**
 * @swagger
 * /admin/coupon:
 *   post:
 *     tags: [Coupons]
 *     summary: Create a new coupon (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Coupon object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post(
  "/admin/coupon",
  authenticateUser,
  isAdmin,
  CouponController.createCoupon
);

/**
 * @swagger
 * /coupon/{code}:
 *   get:
 *     tags: [Coupons]
 *     summary: Get details of a specific coupon
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the coupon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Internal server error
 */
router.get("/coupon/:code", CouponController.getCoupon);

/**
 * @swagger
 * /admin/coupon/{code}:
 *   delete:
 *     tags: [Coupons]
 *     summary: Delete a specific coupon (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Coupon deleted successfully
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/admin/coupon/:code",
  authenticateUser,
  isAdmin,
  CouponController.deleteCoupon
);

/**
 * @swagger
 * /admin/coupon/{code}:
 *   patch:
 *     tags: [Coupons]
 *     summary: Update the discountAmount of a specific coupon (Admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       description: Updated discountAmount for the coupon
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discountAmount:
 *                 type: number
 *             required:
 *               - discountAmount
 *     responses:
 *       200:
 *         description: Coupon discountAmount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Internal server error
 */
router.patch(
  "/admin/coupon/:code",
  authenticateUser,
  isAdmin,
  CouponController.updateCouponDiscountAmount
);

export default router;
