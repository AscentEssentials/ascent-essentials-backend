import mongoose, { Model, Schema, Types } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - brand
 *         - price
 *         - category
 *         - description
 *         - quantity
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product
 *         brand:
 *           type: string
 *           description: The brand of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         category:
 *           type: string
 *           description: The ID of the category to which the product belongs
 *         description:
 *           type: string
 *           description: The description of the product
 *         technicalSpecifications:
 *           type: object
 *           description: JSON field for technical specifications
 *         quantity:
 *           type: number
 *           minimum: 0
 *           description: The available quantity of the product
 *       example:
 *         name: "Product 1"
 *         brand: "Brand A"
 *         price: 19.99
 *         category: "60a9b8e5b6f9b7287418b16c"
 *         description: "This is the description of Product 1"
 *         technicalSpecifications: { type: "single", diameter: "2.3 mm" }
 *         quantity: 50
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductResponse:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - brand
 *         - price
 *         - category
 *         - description
 *         - technicalSpecifications
 *         - quantity
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         brand:
 *           type: string
 *           description: The brand of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         category:
 *           type: string
 *           description: The ID of the category to which the product belongs
 *         description:
 *           type: string
 *           description: The description of the product
 *         technicalSpecifications:
 *           type: object
 *           description: JSON field for technical specifications
 *         quantity:
 *           type: number
 *           minimum: 0
 *           description: The available quantity of the product
 *       example:
 *         _id: "60a9b8e5b6f9b7287418b16c"
 *         name: "Product 1"
 *         brand: "Brand A"
 *         price: 19.99
 *         category: "60a9b8e5b6f9b7287418b16c"
 *         description: "This is the description of Product 1"
 *         technicalSpecifications: { type: "single", diameter: "2.3 mm" }
 *         quantity: 50
 */

/**
 * Schema of a product for MongoDB
 */
export interface IProductDocument extends mongoose.Document {
  name: string;
  brand: string;
  price: mongoose.Types.Decimal128;
  category: mongoose.Schema.Types.ObjectId;
  description: string;
  technicalSpecifications: Record<string, unknown>; // JSON field
  quantity: number;
}

const productSchema = new Schema<IProductDocument>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Types.Decimal128, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    validate: {
      validator: async function (value: mongoose.Types.ObjectId) {
        const category = await mongoose.model("Category").findById(value);
        return !!category;
      },
      message: "Invalid category reference",
    },
  },
  description: { type: String, required: true },
  technicalSpecifications: { type: Schema.Types.Mixed }, // JSON field
  quantity: { type: Number, required: true, min: 0 },
});

const productModel: Model<IProductDocument> = mongoose.model(
  "Product",
  productSchema
);
export default productModel;
