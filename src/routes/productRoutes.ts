import express, { Request, Response } from "express";

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
 * /:
 *   get:
 *     summary: home page
 *     responses:
 *       200:
 *         description: Returns the home page message
 */

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

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
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       404:
 *         description: No products found
 *       500:
 *         description: Internal server error
 */

router.route("/products").get((req: Request, res: Response) => {
  // Logic to fetch all products from the database
  res.send("Get all products");
});

/**
 * @swagger
 * /product:
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */

router.post("/products", (req: Request, res: Response) => {
  // Logic to create a new product in the database
  res.send("Create a new product");
});

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