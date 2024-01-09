import mongoose, { Model, Schema } from "mongoose";
import { IProductDocument } from "./productModel";

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The ID of the order
 *         userId:
 *           type: string
 *           description: The ID of the user who placed the order
 *         userAddress:
 *           type: object
 *           description: The address details of the user
 *           properties:
 *             address:
 *               type: string
 *               description: The address of the user
 *             addressNumber:
 *               type: string
 *               description: The address number of the user
 *             zipCode:
 *               type: string
 *               description: The zip code of the user's address
 *             telephoneNumber:
 *               type: string
 *               description: The telephone number of the user
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         shippingCosts:
 *           type: number
 *           description: The cost of shipping for the order
 *         orderTotal:
 *           type: number
 *           description: The total amount of the order, including shipping costs
 *         status:
 *           type: string
 *           description: The status of the order (e.g., "pending", "shipped", "delivered")
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created
 *       example:
 *         _id: "60a9b8e5b6f9b7287418b16c"
 *         userId: "60a9b8e5b6f9b7287418b16c"
 *         userAddress:
 *           address: "123 Main Street, City"
 *           addressNumber: "456"
 *           zipCode: "12345"
 *           telephoneNumber: "+1234567890"
 *         items: [{ name: "Product 1", brand: "Brand A", price: 19.90, subCategoryId: "60a9b8e5b6f9b7287418b16c", description: "This is the description of Product 1", technicalSpecifications: { type: "single", diameter: "2.3 mm" }, quantity: 2, images: ["image1.jpg", "image2.jpg"] }]
 *         shippingCosts: 5.00
 *         orderTotal: 44.80
 *         status: "pending"
 *         createdAt: "2024-01-10T12:34:56Z"
 */

export interface IUserAddress {
  address: string;
  addressNumber: string;
  zipCode: string;
  telephoneNumber: string;
}

export interface IOrderDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  userAddress: IUserAddress;
  items: IProductDocument[]; // Reusing the IProductDocument interface for order items
  orderTotal: number;
  shippingCosts: number;
  status: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrderDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userAddress: {
      address: { type: String, required: true },
      addressNumber: { type: String, required: true },
      zipCode: { type: String, required: true },
      telephoneNumber: { type: String, required: true },
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    shippingCosts: { type: Number, required: true },
    orderTotal: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const OrderModel: Model<IOrderDocument> = mongoose.model("Order", orderSchema);

export default OrderModel;
