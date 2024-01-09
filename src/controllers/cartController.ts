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

      // Update the cart total (maybe the price of a product has changed)
      userCart.cartTotal = await getCartTotal(userCart);

      // Save the updated cart
      await userCart.save();

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
      const productId = req.body.productId as string;
      const quantityRequired = parseInt(req.body.quantity as string);

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
      if (product.quantity < quantityRequired) {
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
        const futureQuantity = existingCartItem.quantity + quantityRequired;
        if (futureQuantity <= product.quantity) {
          existingCartItem.quantity = futureQuantity;
        } else {
          res.status(400).send("Not enough quantity available");
          return;
        }
      } else {
        // If the product is not in the cart, add a new item
        userCart.items.push({
          productId: product._id,
          quantity: quantityRequired,
        } as ICartItemDocument);
      }

      // Save the updated cart
      await userCart.save();

      // Update the cart total
      userCart.cartTotal = await getCartTotal(userCart);

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

      // Remove the product from the cart
      userCart.items.splice(productIndex, 1)[0];

      // Update the cart total
      userCart.cartTotal = await getCartTotal(userCart);

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
  /**
   * Clear the user's cart.
   */
  static async clearCart(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user as IUserDocument;
      const userId = user._id;

      // Find the user's cart
      const userCart: ICartDocument | null = await CartModel.findOne({
        userId,
      });

      // Return a new cart if the cart doesn't exist
      if (!userCart) {
        const newCart = await createNewCart(userId);
        res.status(200).json(newCart);
        return;
      }

      // Clear the cart items and update the cart total
      userCart.items = [];
      userCart.cartTotal = 0;

      // Save the updated cart
      await userCart.save();

      res.status(200).json(userCart);
    } catch (error) {
      console.error("[CartController] Error clearing user's cart:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Update the quantity of a product in the user's cart.
   */
  static async updateCartItemQuantity(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user as IUserDocument;
      const userId = user._id;
      const productId = req.body.productId as string;
      const newQuantity = parseInt(req.body.quantity as string);

      // Validate if productId is a valid ObjectId
      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        res.status(400).send("Invalid product id");
        return;
      }

      // Validate if newQuantity is a valid integer
      if (!newQuantity || isNaN(newQuantity) || newQuantity < 0) {
        res.status(400).send("Invalid quantity");
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

      // Fetch the product details
      const product = await ProductModel.findById(productId);

      // Return 404 if the product is not found
      if (!product) {
        res.status(404).send("Product not found in the store");
        return;
      }

      // Check if the newQuantity exceeds the available stock
      if (newQuantity > product.quantity) {
        res
          .status(400)
          .send(
            "Not enough quantity available, the available quantity is " +
              product.quantity.toString() +
              ""
          );
        return;
      }

      // Update the quantity of the product in the cart
      userCart.items[productIndex].quantity = newQuantity;

      // Update the cart total
      userCart.cartTotal = await getCartTotal(userCart);

      userCart.save();

      res.status(200).json(userCart);
    } catch (error) {
      console.error(
        "[CartController] Error updating cart item quantity:",
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
    cartTotal: 0,
  });
  await newCart.save();
  return newCart;
};

export const getCartTotal = async (cart: ICartDocument): Promise<number> => {
  let total = 0;
  for (let i = 0; i < cart.items.length; i++) {
    const product = await ProductModel.findById(cart.items[i].productId);
    if (product) {
      total += product.price.valueOf() * cart.items[i].quantity;
    }
  }
  return total;
};
