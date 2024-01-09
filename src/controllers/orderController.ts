import { Response } from "express";
import OrderModel, { IOrderDocument } from "../models/orderModel";
import { AuthenticatedRequest } from "../middleware/authentication";
import UserModel, { IUserDocument } from "../models/userModel";
import CartModel, {
  ICartDocument,
  ICartItemDocument,
} from "../models/cartModel";
import { getCartTotal } from "./cartController";
import ProductModel, { IProductDocument } from "../models/productModel";

/**
 * Controller for handling order-related operations.
 */
export class OrderController {
  /**
   * Get all orders of the actual user.
   */
  static async getAllOrdersOfActualUser(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user as IUserDocument;
      const userId = user._id;

      const orders: IOrderDocument[] = await OrderModel.find({ userId }).sort({
        createdAt: -1,
      });

      // Response to respect the array of Order schema.
      const response = orders.map((order) =>
        OrderController.mapOrderToResponse(order)
      );

      res.status(200).json(response);
    } catch (error) {
      console.error("[OrderController] Error fetching orders:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Get all orders of all users.
   */
  static async getAllOrders(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const orders: IOrderDocument[] = await OrderModel.find().sort({
        createdAt: -1,
      });

      // Response to respect the array of Order schema.
      const response = orders.map((order) =>
        OrderController.mapOrderToResponse(order)
      );

      res.status(200).json(response);
    } catch (error) {
      console.error("[OrderController] Error fetching orders:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Add a new order.
   */
  static async addOrder(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user as IUserDocument;
      const userId = user._id;
      const shippingCosts = req.body.shippingCosts;

      // Find the user's cart in the database
      const userCart: ICartDocument | null = await CartModel.findOne({
        userId,
      });

      if (!userCart) {
        // Handle the case where the user's cart is not found
        res.status(400).json({ error: "User's cart not found" });
        return;
      }

      // Extract necessary data from the user's cart
      const cartTotal = await getCartTotal(userCart);
      const items = userCart.items;

      // Fetch the user's address from the UserModel
      const userAddress = await UserModel.findOne({ _id: userId }).select(
        "address addressNumber zipCode telephoneNumber"
      );

      // Check if the user's address is available
      if (!userAddress) {
        // Handle the case where the user's address is not found
        res.status(400).json({ error: "User's address not found" });
        return;
      }

      // Create the new order
      const newOrder: IOrderDocument = await OrderModel.create({
        userId,
        userAddress: {
          address: userAddress.address,
          addressNumber: userAddress.addressNumber,
          zipCode: userAddress.zipCode,
          telephoneNumber: userAddress.telephoneNumber,
        },
        items: await Promise.all(
          items.map(async (item: ICartItemDocument) => {
            const productDetails: IProductDocument | null =
              await ProductModel.findById(item.productId);
            if (!productDetails) {
              throw new Error(
                `Product details not found for productId: ${item.productId}`
              );
            }
            return productDetails;
          })
        ),
        shippingCosts,
        orderTotal: cartTotal + shippingCosts,
        status: "pending",
      });

      // Return the newly created order as a response
      res.status(201).json(OrderController.mapOrderToResponse(newOrder));
    } catch (error) {
      console.error("[OrderController] Error adding order:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Private function to map an IOrderDocument to a response object respecting the Order schema.
   */
  private static mapOrderToResponse(order: IOrderDocument) {
    return {
      _id: order._id,
      userId: order.userId,
      userAddress: order.userAddress,
      items: order.items.map((item) => ({
        name: item.name,
        brand: item.brand,
        price: item.price,
        subCategoryId: item.subCategoryId,
        description: item.description,
        technicalSpecifications: item.technicalSpecifications,
        quantity: item.quantity,
        images: item.images,
      })),
      shippingCosts: order.shippingCosts,
      orderTotal: order.orderTotal,
      status: order.status,
      createdAt: order.createdAt,
    };
  }
}

export default OrderController;
