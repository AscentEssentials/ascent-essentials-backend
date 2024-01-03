import express, { Request, Response } from "express";
import { ProductController } from "../controllers/productController";
import { upload, directoryToStoreImages } from "../utils/multerConfig";

/**
 * Express router for handling product-related routes.
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

const router = express.Router();

/**
 * @swagger
 * /product:
 *   post:
 *     tags:
 *       - Products
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post(
  "/product",
  upload.array("images"),
  ProductController.createProduct
);

/**
 * @swagger
 * /product/image/{imageName}:
 *   get:
 *     tags: [Products]
 *     summary: Serve a specific product image
 *     description: Endpoint to serve a specific product image.
 *     parameters:
 *       - in: path
 *         name: imageName
 *         required: true
 *         description: The name of the image file.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Image served successfully
 *         content:
 *           image/*:
 *             example: <binary image data>
 *       '404':
 *         description: Image not found
 *       '500':
 *         description: Internal server error
 */
router.use("/product/image", express.static(directoryToStoreImages));

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Returns all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       500:
 *         description: Internal server error
 */

router.get("/products", ProductController.getAllProducts);

/**
 * @swagger
 * /products/subcategory/{subcategoryId}:
 *   get:
 *     tags: [Products]
 *     summary: Get all products of a subcategory
 *     parameters:
 *       - in: path
 *         name: subcategoryId
 *         required: true
 *         description: The ID of the subcategory
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns all products of the subcategory
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/products/subcategory/:subcategoryId",
  ProductController.getProductsBySubCategory
);

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     tags: [Products]
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/product/:productId", ProductController.getProductById);

/**
 * @swagger
 * /product/{productId}:
 *   put:
 *     tags: [Products]
 *     summary: Update details of a product
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.put(
  "/product/:productId",
  upload.array("images"),
  ProductController.editProduct
);

export default router;
