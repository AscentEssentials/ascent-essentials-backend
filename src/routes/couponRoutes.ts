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
 *                 $ref: '#/components/schemas/CouponResponse'
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
 *               $ref: '#/components/schemas/CouponResponse'
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

// swagger doc for route to get details of a specific coupon
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
 *               $ref: '#/components/schemas/CouponResponse'
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Internal server error
 */
router.get("/coupon/:code", CouponController.getCoupon);

export default router;
