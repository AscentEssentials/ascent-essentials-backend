import { Response } from "express";
import CartModel, {
  ICartDocument,
  ICartItemDocument,
} from "../models/cartModel";
import { AuthenticatedRequest } from "../middleware/authentication";
import { IUserDocument } from "../models/userModel";
import ProductModel from "../models/productModel";
import mongoose from "mongoose";

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
      });

      // If the user doesn't have a cart yet, create one
      if (!userCart) {
        const newCart = await createNewCart(userId);
        res.status(200).json(newCart);
        return;
      }

      res.status(200).json(userCart);
    } catch (error) {
      console.error("[CartController] Error getting user's cart:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Add a product to the user's cart.
   */
  static async addToCart(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user as IUserDocument;
      const userId = user._id;
      const productId = req.query.productId as string;

      // Validate if productId is a valid ObjectId
      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).send("Invalid product id");
        return;
      }

      // Check if the product exists
      const product = await ProductModel.findById(productId);
      if (!product) {
        res.status(404).send("Product not found");
        return;
      }

      // Check if there is enough quantity of the product
      if (product.quantity <= 0) {
        res.status(400).send("Not enough quantity available");
        return;
      }

      // Find the user's cart
      let userCart: ICartDocument | null = await CartModel.findOne({
        userId,
      });
      // or create a new one if not exists
      if (!userCart) {
        userCart = await createNewCart(userId);
      }
      // Check if the product is already in the cart
      const existingCartItem = userCart.items.find(
        (item: ICartItemDocument) => item.productId.toString() === productId
      );

      if (existingCartItem) {
        // If the product is already in the cart, check if there's enough quantity
        if (existingCartItem.quantity < product.quantity) {
          existingCartItem.quantity += 1;
        } else {
          res.status(400).send("Not enough quantity available");
          return;
        }
      } else {
        // If the product is not in the cart, add a new item
        userCart.items.push({
          productId: product._id,
          quantity: 1,
        } as ICartItemDocument);
      }

      // Update the order total
      userCart.orderTotal += product.price.valueOf();

      // Save the updated cart
      await userCart.save();

      res.status(200).json(userCart);
    } catch (error) {
      console.error("[CartController] Error adding product to cart:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Remove a product from the user's cart.
   */
  static async removeFromCart(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user as IUserDocument;
      const userId = user._id;
      const productId = req.query.productId as string;

      // Validate if productId is a valid ObjectId
      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).send("Invalid product id");
        return;
      }

      // Find the user's cart
      const userCart: ICartDocument | null = await CartModel.findOne({
        userId,
      });

      // Return 404 if the cart doesn't exist
      if (!userCart) {
        res.status(404).send("Cart not found");
        return;
      }

      // Find the index of the product in the cart
      const productIndex = userCart.items.findIndex(
        (item: ICartItemDocument) => item.productId.toString() === productId
      );

      // Return 404 if the product is not in the cart
      if (productIndex === -1) {
        res.status(404).send("Product not found in the cart");
        return;
      }

      // Fetch the product details to get the price
      const product = await ProductModel.findById(productId);

      // Return 404 if the product is not found
      if (!product) {
        res.status(404).send("Product not found in the store");
        return;
      }

      // Remove the product from the cart
      const removedProduct = userCart.items.splice(productIndex, 1)[0];

      // Update the order total
      userCart.orderTotal -= removedProduct.quantity * product.price.valueOf();

      // Save the updated cart
      await userCart.save();

      res.status(200).json(userCart);
    } catch (error) {
      console.error(
        "[CartController] Error removing product from cart:",
        error
      );
      res.status(500).send("Internal Server Error");
    }
  }
}
export default CartController;

const createNewCart = async (
  userId: mongoose.Types.ObjectId
): Promise<ICartDocument> => {
  const newCart: ICartDocument = new CartModel({
    userId,
    items: [],
    orderTotal: 0,
  });
  await newCart.save();
  return newCart;
};