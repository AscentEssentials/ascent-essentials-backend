import mongoose, { Model, Schema } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       required:
 *         - code
 *         - discountAmount
 *       properties:
 *         code:
 *           type: string
 *           description: The code of the coupon
 *         discountAmount:
 *           type: number
 *           description: The discount amount of the coupon
 *       example:
 *         code: "SUMMER2021"
 *         discountAmount: 10
 */

export interface ICouponDocument extends mongoose.Document {
  code: string;
  discountAmount: number;
}

const couponSchema = new Schema<ICouponDocument>({
  code: { type: String, required: true },
  discountAmount: { type: Number, required: true },
});

const CouponModel: Model<ICouponDocument> = mongoose.model(
  "Coupon",
  couponSchema
);

export default CouponModel;
