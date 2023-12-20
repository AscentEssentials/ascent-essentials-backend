/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - category
 *         - price
 *         - description
 *         - availableQuantity
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         category:
 *           $ref: '#/components/schemas/Category'
 *           description: The category of the product
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *         availableQuantity:
 *           type: number
 *           description: The available quantity of the product
 *       example:
 *         id: "1"
 *         name: "Product 1"
 *         category:
 *           id: "1"
 *           name: "Category 1"
 *         price: 9.99
 *         description: "This is a product"
 *         availableQuantity: 10
 */
