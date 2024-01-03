import mongoose, { Model, Schema } from "mongoose";

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
 *         - subCategoryId
 *         - description
 *         - technicalSpecifications
 *         - quantity
 *         - images
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
 *         subCategoryId:
 *           type: string
 *           description: The ID of the subcategory to which the product belongs
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
 *         images:
 *           type: array
 *           description: Image files for the product
 *           items:
 *             type: string
 *             format: binary
 *       example:
 *         name: "Product 1"
 *         brand: "Brand A"
 *         price: 19.99
 *         subCategoryId: "60a9b8e5b6f9b7287418b16c"
 *         description: "This is the description of Product 1"
 *         technicalSpecifications: { type: "single", diameter: "2.3 mm" }
 *         quantity: 50
 *         images: ["base64encodedimage"]
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
 *         - subCategoryId
 *         - description
 *         - technicalSpecifications
 *         - quantity
 *         - images
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
 *         subCategoryId:
 *           type: string
 *           description: The ID of the subcategory to which the product belongs
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
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Paths to the images of the product
 *       example:
 *         _id: "60a9b8e5b6f9b7287418b16c"
 *         name: "Product 1"
 *         brand: "Brand A"
 *         price: 19.99
 *         subCategoryId: "60a9b8e5b6f9b7287418b16c"
 *         description: "This is the description of Product 1"
 *         technicalSpecifications: { type: "single", diameter: "2.3 mm" }
 *         quantity: 50
 *         images: ["uploads/image1.jpg", "uploads/image2.jpg"]
 */

/**
 * Schema of a product for MongoDB
 */
export interface IProductDocument extends mongoose.Document {
  name: string;
  brand: string;
  price: Number;
  subCategoryId: mongoose.Schema.Types.ObjectId;
  description: string;
  technicalSpecifications: Record<string, unknown>; // JSON field
  quantity: number;
  images: string[]; // Array of file paths for images
}

const productSchema = new Schema<IProductDocument>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  subCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
    index: true,
    validate: {
      validator: async function (value: mongoose.Types.ObjectId) {
        const subCategory = await mongoose.model("SubCategory").findById(value);
        return !!subCategory;
      },
      message: "Invalid subcategory reference",
    },
  },
  description: { type: String, required: true },
  technicalSpecifications: { type: Schema.Types.Mixed }, // JSON field
  quantity: { type: Number, required: true, min: 0 },
  images: [{ type: String }], // Array of file paths for images
});

// Indexes for text search
productSchema.index({
  name: "text",
  brand: "text",
  description: "text",
});

const productModel: Model<IProductDocument> = mongoose.model(
  "Product",
  productSchema
);
export default productModel;
