import express from "express";
import SubCategoryController from "../controllers/subCategoryController";

const router = express.Router();

/**
 * @swagger
 * /subcategories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all subcategories
 *     responses:
 *       200:
 *         description: Returns all subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SubCategoryResponse'
 *       500:
 *         description: Internal server error
 */
router.get("/subcategories", SubCategoryController.getAllSubCategories);

/**
 * @swagger
 * /subcategory:
 *   post:
 *     tags: [Categories]
 *     summary: Create a new subcategory
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       201:
 *         description: The created subcategory
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategoryResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/subcategory", SubCategoryController.createSubCategory);

export default router;
