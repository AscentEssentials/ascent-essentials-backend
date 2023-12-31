import express, { Request, Response } from "express";
import {
  ProductController,
  upload,
  directoryToStoreImages,
} from "../controllers/productController";

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
 * /product/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Get a specific product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */

router.get("/products/:id", (req: Request, res: Response) => {
  const productId = req.params.id;
  // Logic to fetch a specific product by ID from the database
  res.send(`Get product with ID ${productId}`);
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Update a specific product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */

router.put("/products/:id", (req: Request, res: Response) => {
  const productId = req.params.id;
  // Logic to update a specific product by ID in the database
  res.send(`Update product with ID ${productId}`);
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Delete a specific product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */

router.delete("/products/:id", (req: Request, res: Response) => {
  const productId = req.params.id;
  // Logic to delete a specific product by ID from the database
  res.send(`Delete product with ID ${productId}`);
});

export default router;
