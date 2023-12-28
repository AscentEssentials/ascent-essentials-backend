import express from "express";
import CategoryController from '../controllers/categoryController';

/**
 * Express router for handling category-related routes.
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for managing categories
 */

const router = express.Router();
router.get('/categories', CategoryController.getAllCategories);
router.post("/category", CategoryController.createCategory);

export default router;