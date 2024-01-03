import express from "express";
import CategoryController from "../controllers/categoryController";

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
 *   post:
 *     tags: [Categories]
 *     summary: Create a new category
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
 *       500:
 *         description: Internal server error
 */
router.post("/category", CategoryController.createCategory);

export default router;
