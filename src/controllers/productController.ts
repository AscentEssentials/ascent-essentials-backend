import { Request, Response } from "express";
import ProductModel, { IProductDocument } from "../models/productModel";
import mongoose from "mongoose";

/**
 * Controller for handling product-related operations.
 */
export class ProductController {
  /**
   * Get all products.
   */
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products: IProductDocument[] = await ProductModel.find();
      // Response to respect the array of ProductResponse schema.
      const response = products.map((product) => ({
        _id: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        category: product.category,
        description: product.description,
        technicalSpecifications: product.technicalSpecifications,
        quantity: product.quantity,
      }));
      res.status(200).json(response);
    } catch (error) {
      console.log("[ProductController] Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Create a new product.
   */
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        brand,
        price,
        category,
        description,
        technicalSpecifications,
        quantity,
      } = req.body;

      // Input validation
      if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof brand !== "string" ||
        !brand.trim() ||
        typeof price !== "number" ||
        isNaN(price) ||
        typeof category !== "string" ||
        !category.trim() ||
        typeof description !== "string" ||
        !description.trim() ||
        typeof technicalSpecifications !== "object" ||
        typeof quantity !== "number" ||
        isNaN(quantity)
      ) {
        console.error("[ProductController] Invalid or missing product data");
        res.status(400).send("Invalid or missing product data");
        return;
      }

      const newProduct: IProductDocument = new ProductModel({
        name,
        brand,
        price,
        category,
        description,
        technicalSpecifications,
        quantity,
      });

      await newProduct.save();

      // Response to respect the ProductResponse schema.
      const response = {
        _id: newProduct._id,
        name: newProduct.name,
        brand: newProduct.brand,
        price: newProduct.price,
        category: newProduct.category,
        description: newProduct.description,
        technicalSpecifications: newProduct.technicalSpecifications,
        quantity: newProduct.quantity,
      };
      res.status(201).json(response);
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.ValidationError) {
        console.error("[ProductController] Error validating product:", error);
        res.status(400).send(error.message);
      } else {
        console.error("[ProductController] Error creating product:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  }
}

export default ProductController;
