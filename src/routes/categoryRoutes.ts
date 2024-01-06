import express from "express";
import CategoryController from "../controllers/categoryController";
import { authenticateToken, isAdmin } from "../middleware/authentication";

/**
 * Express router for handling category and subcategory related routes.
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing categories and subcategories
 */

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: Returns all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CategoryResponse'
 *       500:
 *         description: Internal server error
 */
router.get("/categories", CategoryController.getAllCategories);

/**
 * @swagger
 * /category:
 *   get:
 *     tags: [Categories]
 *     summary: Get details of a category
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns details of a category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get("/category", CategoryController.getCategory);

/**
 * @swagger
 * /category:
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: The created category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
router.post(
  "/category",
  authenticateToken,
  isAdmin,
  CategoryController.createCategory
);

export default router;
