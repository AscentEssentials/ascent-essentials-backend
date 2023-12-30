import { Request, Response } from "express";
import ProductModel, { IProductDocument } from "../models/productModel";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename the file to avoid conflicts
  },
});

export const upload = multer({ storage: storage });

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
        images: product.images,
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

      try {
        // Convert price and quantity to numbers
        const numericPrice = parseFloat(price);
        const numericQuantity = parseInt(quantity);

        // Parse technicalSpecifications JSON string into an object
        const parsedTechnicalSpecifications = JSON.parse(
          technicalSpecifications
        );

        // Input validation
        if (
          typeof name !== "string" ||
          !name.trim() ||
          typeof brand !== "string" ||
          !brand.trim() ||
          isNaN(numericPrice) ||
          typeof category !== "string" ||
          !category.trim() ||
          typeof description !== "string" ||
          !description.trim() ||
          typeof parsedTechnicalSpecifications !== "object" ||
          isNaN(numericQuantity)
        ) {
          console.error("[ProductController] Invalid or missing product data");
          res.status(400).send("Invalid or missing product data");
          return;
        }
      } catch (error) {
        console.error("[ProductController] Invalid or missing product data");
        res.status(400).send("Invalid or missing product data");
        return;
      }

      // Handle image uploads
      const imagePaths: string[] = [];
      if (Array.isArray(req.files) && req.files.length > 0) {
        (req.files as Express.Multer.File[]).forEach((file) => {
          imagePaths.push(path.join("uploads", file.filename));
        });
      }

      const newProduct: IProductDocument = new ProductModel({
        name,
        brand,
        price,
        category,
        description,
        technicalSpecifications,
        quantity,
        images: imagePaths,
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
        images: newProduct.images,
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
