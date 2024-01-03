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
 *   get:
 *     tags: [Categories]
 *     summary: Get details of a subcategory
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: The ID of the subcategory to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns details of a subcategory
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategoryResponse'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get("/subcategory", SubCategoryController.getSubCategory);

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

/**
 * @swagger
 * /subcategory/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Update details of a subcategory
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the subcategory to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubCategory'
 *     responses:
 *       200:
 *         description: Returns updated details of the subcategory
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SubCategoryResponse'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */
router.put("/subcategory/:id", SubCategoryController.editSubCategory);

export default router;
