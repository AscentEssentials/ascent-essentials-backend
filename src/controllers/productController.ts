import { Request, Response } from "express";
import ProductModel, { IProductDocument } from "../models/productModel";
import { directoryToStoreImages } from "../utils/multerConfig";
import SubCategoryModel from "../models/subCategoryModel";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

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
        subCategoryId: product.subCategoryId,
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
        subCategoryId,
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
          typeof subCategoryId !== "string" ||
          !subCategoryId.trim() ||
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
          imagePaths.push(path.join(file.filename));
        });
      }

      const newProduct: IProductDocument = new ProductModel({
        name,
        brand,
        price,
        subCategoryId,
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
        category: newProduct.subCategoryId,
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
        // If an error occurs, delete the newly uploaded images
        if (Array.isArray(req.files) && req.files.length > 0) {
          try {
            req.files.forEach((file) => {
              const filePath = path.join(directoryToStoreImages, file.filename);
              fs.unlinkSync(filePath);
            });
          } catch (deleteError) {
            console.error(
              "[ProductController] Error deleting uploaded images:",
              deleteError
            );
          }
        }
        res.status(500).send("Internal Server Error");
      }
    }
  }

  /**
   * Get all products of a subcategory.
   */
  static async getProductsBySubCategory(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const subcategoryId = req.params.subcategoryId;

      // Validate if subcategoryId is a valid ObjectId
      if (!subcategoryId || !mongoose.Types.ObjectId.isValid(subcategoryId)) {
        console.error("[ProductController] Invalid subcategory id");
        res.status(400).send("Invalid subcategory id");
        return;
      }
      // Check if the subcategory exists
      const isSubCategoryExists = await SubCategoryModel.exists({
        _id: subcategoryId,
      });
      if (!isSubCategoryExists) {
        console.error("[ProductController] Subcategory not found");
        res.status(404).send("Subcategory not found");
        return;
      }

      const products: IProductDocument[] = await ProductModel.find({
        subCategoryId: subcategoryId,
      });

      // Response to respect the ProductResponse schema.
      const response = products.map((product) => ({
        _id: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        subCategoryId: product.subCategoryId,
        description: product.description,
        technicalSpecifications: product.technicalSpecifications,
        quantity: product.quantity,
        images: product.images,
      }));

      res.status(200).json(response);
    } catch (error) {
      console.error(
        "[ProductController] Error fetching products by subcategory:",
        error
      );
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Get details of a product.
   */
  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId;

      // Validate if productId is a valid ObjectId
      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        console.error("[ProductController] Invalid product id");
        res.status(400).send("Invalid product id");
        return;
      }
      // Check if the product exists
      const product: IProductDocument | null = await ProductModel.findById(
        productId
      );
      if (!product) {
        console.error("[ProductController] Product not found");
        res.status(404).send("Product not found");
        return;
      }

      // Response to respect the ProductResponse schema.
      const response = {
        _id: product._id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        subCategoryId: product.subCategoryId,
        description: product.description,
        technicalSpecifications: product.technicalSpecifications,
        quantity: product.quantity,
        images: product.images,
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("[ProductController] Error fetching product:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Edit details of a product.
   */
  static async editProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId;

      // Validate if productId is a valid ObjectId
      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        console.error("[ProductController] Invalid product id");
        res.status(400).send("Invalid product id");
        return;
      }
      // Check if the product exists
      const existingProduct: IProductDocument | null =
        await ProductModel.findById(productId);
      if (!existingProduct) {
        console.error("[ProductController] Product not found");
        res.status(404).send("Product not found");
        return;
      }

      // Update product fields
      const {
        name,
        brand,
        price,
        subCategoryId,
        description,
        technicalSpecifications,
        quantity,
      } = req.body;

      // Update existing product with new values
      existingProduct.name = name;
      existingProduct.brand = brand;
      existingProduct.price = price;
      existingProduct.subCategoryId = subCategoryId;
      existingProduct.description = description;
      existingProduct.technicalSpecifications = technicalSpecifications;
      existingProduct.quantity = quantity;

      // Handle image updates (assuming images are being replaced entirely)
      if (Array.isArray(req.files) && req.files.length > 0) {
        // delete existing images
        if (existingProduct.images && existingProduct.images.length > 0) {
          try {
            // Delete existing images from the storage
            existingProduct.images.forEach((imagePath) => {
              // use the 'fs' module to delete files from the server
              const fullPath = path.join(directoryToStoreImages, imagePath);
              // Check if the file exists before attempting to delete
              if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
              } else {
                console.warn(
                  `[ProductController] Image not found: ${fullPath}`
                );
              }
            });
          } catch (error) {
            console.error(
              "[ProductController] Error deleting existing images:",
              error
            );
            res.status(500).send("Internal Server Error");
            return;
          }
        }

        // Update with new image paths
        const imagePaths: string[] = (req.files as Express.Multer.File[]).map(
          (file) => path.join(file.filename)
        );
        existingProduct.images = imagePaths;
      }

      // Save the updated product
      await existingProduct.save();

      // Response to respect the ProductResponse schema.
      const response = {
        _id: existingProduct._id,
        name: existingProduct.name,
        brand: existingProduct.brand,
        price: existingProduct.price,
        subCategoryId: existingProduct.subCategoryId,
        description: existingProduct.description,
        technicalSpecifications: existingProduct.technicalSpecifications,
        quantity: existingProduct.quantity,
        images: existingProduct.images,
      };
      res.status(200).json(response);
    } catch (error) {
      console.error("[ProductController] Error editing product:", error);
      // If an error occurs, delete the newly uploaded images
      if (Array.isArray(req.files) && req.files.length > 0) {
        try {
          req.files.forEach((file) => {
            const filePath = path.join(directoryToStoreImages, file.filename);
            fs.unlinkSync(filePath);
          });
        } catch (deleteError) {
          console.error(
            "[ProductController] Error deleting uploaded images:",
            deleteError
          );
        }
      }
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Delete a product by ID.
   */
  static async deleteProductById(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId;

      // Validate if productId is a valid ObjectId
      if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        console.error("[ProductController] Invalid product id");
        res.status(400).send("Invalid product id");
        return;
      }

      // Check if the product exists
      const existingProduct: IProductDocument | null =
        await ProductModel.findById(productId);
      if (!existingProduct) {
        console.error("[ProductController] Product not found");
        res.status(404).send("Product not found");
        return;
      }

      // Delete existing images from the storage
      if (existingProduct.images && existingProduct.images.length > 0) {
        try {
          existingProduct.images.forEach((imagePath) => {
            const fullPath = path.join(directoryToStoreImages, imagePath);
            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath);
            } else {
              console.warn(`[ProductController] Image not found: ${fullPath}`);
            }
          });
        } catch (error) {
          console.error(
            "[ProductController] Error deleting existing images:",
            error
          );
          res.status(500).send("Internal Server Error");
          return;
        }
      }

      // Remove the product from the database
      await ProductModel.deleteOne({ _id: productId });

      // Respond with a 204 status indicating successful deletion
      res.status(204).send();
    } catch (error) {
      console.error("[ProductController] Error deleting product:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default ProductController;
