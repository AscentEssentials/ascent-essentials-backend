import { AuthenticatedRequest } from "../middleware/authentication";
import CouponModel from "../models/couponModel";
import { ICouponDocument } from "../models/couponModel";
import { Request, Response } from "express";

export class CouponController {
  /**
   * Get all coupons.
   */
  static async getAllCoupons(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const coupons: ICouponDocument[] = await CouponModel.find().sort({
        createdAt: -1,
      });

      const response = coupons.map((coupon) =>
        CouponController.mapCouponToResponse(coupon)
      );

      res.status(200).json(response);
    } catch (error) {
      console.error("[CouponController] Error fetching coupons:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Get a specific coupon.
   */
  static async getCoupon(req: Request, res: Response): Promise<void> {
    try {
      const couponCode = req.params.code;

      const coupon = await CouponModel.findOne({ code: couponCode });

      if (!coupon) {
        res.status(404).json({ error: "Coupon not found" });
        return;
      }

      res.status(200).json(CouponController.mapCouponToResponse(coupon));
    } catch (error) {
      console.error("[CouponController] Error fetching coupon:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Create a new coupon.
   */
  static async createCoupon(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const { code, discountAmount } = req.body;
      const coupon = await CouponModel.findOne({ code: code });

      if (coupon) {
        res.status(400).json({ error: "Coupon already exists" });
        return;
      }

      const newCoupon = new CouponModel({
        code,
        discountAmount,
      });

      await newCoupon.save();

      res.status(201).json(CouponController.mapCouponToResponse(newCoupon));
    } catch (error) {
      console.error("[CouponController] Error creating coupon:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Delete a specific coupon.
   */
  static async deleteCoupon(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const couponCode = req.params.code;

      // find the coupon and delete it
      const coupon = await CouponModel.findOne({ code: couponCode });

      if (!coupon) {
        res.status(404).json({ error: "Coupon not found" });
        return;
      }

      // delete the coupon
      await coupon.deleteOne();

      res.status(204).send(); // No content, successful deletion
    } catch (error) {
      console.error("[CouponController] Error deleting coupon:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Update the discountAmount of a specific coupon. (Admin only)
   */
  static async updateCouponDiscountAmount(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const couponCode = req.params.code;
      const { discountAmount } = req.body;

      // find the coupon and update it
      const coupon = await CouponModel.findOneAndUpdate(
        { code: couponCode },
        { discountAmount: discountAmount },
        { new: true }
      );

      if (!coupon) {
        res.status(404).json({ error: "Coupon not found" });
        return;
      }

      res.status(200).json(CouponController.mapCouponToResponse(coupon));
    } catch (error) {
      console.error("[CouponController] Error updating coupon:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Map a coupon document to a coupon response.
   */
  private static mapCouponToResponse(coupon: ICouponDocument) {
    return {
      code: coupon.code,
      discountAmount: coupon.discountAmount,
    };
  }
}

export default CouponController;
