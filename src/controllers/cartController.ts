import { Response } from "express";
import CartModel, { ICartDocument } from "../models/cartModel";
import { AuthenticatedRequest } from "../middleware/authentication";
import { IUserDocument } from "../models/userModel";

export class CartController {
  /**
   * Get the user's cart.
   */
  static async getUserCart(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user as IUserDocument;
      const userId = user._id;

      const userCart: ICartDocument | null = await CartModel.findOne({
        userId,
      }).populate("items.productId");

      // If the user doesn't have a cart yet, create one
      if (!userCart) {
        const newCart: ICartDocument = new CartModel({
          userId,
          items: [],
          orderTotal: 0,
        });
        await newCart.save();
        res.status(200).json(newCart);
        return;
      }

      res.status(200).json(userCart);
    } catch (error) {
      console.error("[CartController] Error getting user's cart:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}
export default CartController;
