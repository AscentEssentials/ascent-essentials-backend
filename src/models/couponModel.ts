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
 *         - validTo
 *       properties:
 *         code:
 *           type: string
 *           description: The code of the coupon
 *         discountAmount:
 *           type: number
 *           description: The discount amount of the coupon
 *         validFrom:
 *           type: string
 *           format: date-time
 *           description: The date and time when the coupon becomes valid. if not provided, defaults to current date and time
 *         validTo:
 *           type: string
 *           format: date-time
 *           description: The date and time when the coupon expires
 *       example:
 *         code: "SUMMER2021"
 *         discountAmount: 10
 *         validFrom: "2021-06-01T00:00:00.000Z"
 *         validTo: "2021-08-31T23:59:59.999Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CouponResponse:
 *       type: object
 *       required:
 *         - id
 *         - code
 *         - discountAmount
 *         - validFrom
 *         - validTo
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the coupon
 *         code:
 *           type: string
 *           description: The code of the coupon
 *         discountAmount:
 *           type: number
 *           description: The discount amount of the coupon
 *         validFrom:
 *           type: string
 *           format: date-time
 *           description: The date and time when the coupon becomes valid
 *         validTo:
 *           type: string
 *           format: date-time
 *           description: The date and time when the coupon expires
 *       example:
 *         id: 60b6d6b9e6b3f3b5c8c9d4a1
 *         code: "SUMMER2021"
 *         discountAmount: 10
 *         validFrom: "2021-06-01T00:00:00.000Z"
 *         validTo: "2021-08-31T23:59:59.999Z"
 */

export interface ICouponDocument extends mongoose.Document {
  code: string;
  discountAmount: number;
  validFrom: Date;
  validTo: Date;
}

const couponSchema = new Schema<ICouponDocument>({
  code: { type: String, required: true },
  discountAmount: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validTo: { type: Date, required: true },
});

const CouponModel: Model<ICouponDocument> = mongoose.model(
  "Coupon",
  couponSchema
);

export default CouponModel;
