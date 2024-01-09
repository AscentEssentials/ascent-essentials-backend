import { Request, Response } from "express";
import OrderModel, { IOrderDocument } from "../models/orderModel";
import mongoose from "mongoose";
import { AuthenticatedRequest } from "../middleware/authentication";
import { IUserDocument } from "../models/userModel";

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
