import express, { Request, Response } from "express";
import { ProductController } from "../controllers/productController";
import { upload, directoryToStoreImages } from "../utils/multerConfig";
import { authenticateUser, isAdmin } from "../middleware/authentication";

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
 *     security:
 *       - bearerAuth: []
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
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post(
  "/product",
  authenticateUser,
  isAdmin,
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
 * /products/category/{categoryId}:
 *   get:
 *     tags: [Products]
 *     summary: Get all products in a category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns all products in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/products/category/:categoryId",
  ProductController.getProductsByCategory
);

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
 *     security:
 *       - bearerAuth: []
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
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.put(
  "/product/:productId",
  authenticateUser,
  isAdmin,
  upload.array("images"),
  ProductController.editProduct
);

/**
 * @swagger
 * /product/{productId}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a product by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.delete(
  "/product/:productId",
  authenticateUser,
  isAdmin,
  ProductController.deleteProductById
);

/**
 * @swagger
 * /products/search:
 *   get:
 *     tags: [Products]
 *     summary: Search for products based on a query string
 *     description: |
 *       This endpoint allows you to search for products based on a query string.
 *       The search is performed on the `name`, `brand`, and `description` fields.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: The search query string
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the matched products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get("/products/search", ProductController.searchProducts);

export default router;
