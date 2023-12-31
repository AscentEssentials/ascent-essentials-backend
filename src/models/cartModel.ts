import mongoose, { Model, Schema } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product in the cart
 *         quantity:
 *           type: number
 *           minimum: 1
 *           description: The quantity of the product in the cart
 *       example:
 *         productId: "60a9b8e5b6f9b7287418b16c"
 *         quantity: 2
 */

/**
 * Schema of a cart item for MongoDB
 */
export interface ICartItemDocument extends mongoose.Document {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

const cartItemSchema = new Schema<ICartItemDocument>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who owns the cart
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         cartTotal:
 *           type: number
 *           description: The total amount of the cart
 *       example:
 *         userId: "60a9b8e5b6f9b7287418b16c"
 *         items: [{ productId: "60a9b8e5b6f9b7287418b16c", quantity: 2 }]
 *         cartTotal: 50.99
 */

export interface ICartDocument extends mongoose.Document {
    userId: mongoose.Schema.Types.ObjectId;
    items: ICartItemDocument[];
    cartTotal: number;
}

const cartSchema = new Schema<ICartDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [cartItemSchema],
    cartTotal: { type: Number, required: true, default: 0 },
});

const cartModel: Model<ICartDocument> = mongoose.model("Cart", cartSchema);

export default cartModel;
