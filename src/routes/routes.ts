import express, { Request, Response } from 'express';

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
 *       404:
 *         description: No products found
 *       500:
 *         description: Internal server error
 */

router.get('/products', (req: Request, res: Response) => {
    // Logic to fetch all products from the database
    res.send('Get all products');
});

/**
 * @swagger
 * /product:
 *   post:
 *     tags: [Products]
 *     summary: Create a new product
 *     responses:
 *       200:
 *         description: Returns a success message
 */

router.post('/products', (req: Request, res: Response) => {
    // Logic to create a new product in the database
    res.send('Create a new product');
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
 *       200:
 *         description: Returns the product with the specified ID
 */

router.get('/products/:id', (req: Request, res: Response) => {
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
 *     responses:
 *       200:
 *         description: Returns a success message
 */

router.put('/products/:id', (req: Request, res: Response) => {
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
 *       200:
 *         description: Returns a success message
 */

router.delete('/products/:id', (req: Request, res: Response) => {
    const productId = req.params.id;
    // Logic to delete a specific product by ID from the database
    res.send(`Delete product with ID ${productId}`);
});

export default router;
