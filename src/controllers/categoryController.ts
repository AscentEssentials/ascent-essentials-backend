import { Request, Response } from "express";
import CategoryModel, { ICategoryDocument } from "../models/categoryModel";

/**
 * Controller for handling category-related operations.
 */
export class CategoryController {
  /**
   * Get all categories.
   */
  static async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories: ICategoryDocument[] = await CategoryModel.find();
      // Response to respect the array of CategoryResponse schema.
      const response = categories.map((category) => ({
        _id: category._id,
        name: category.name,
        description: category.description,
      }));
      res.status(200).json(response);
    } catch (error) {
      console.log("[CategoryController] Error fetching categories:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Create a new category.
   */
  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;

      // Input validation, expected to be a string and should not be empty or only contain whitespace characters.
      if (typeof name !== "string" || !name.trim()) {
        console.error("[CategoryController] Invalid or missing category name");
        res.status(400).send("Invalid or missing category name");
        return;
      }

      const newCategory: ICategoryDocument = new CategoryModel({
        name,
        description,
      });
      await newCategory.save();

      // Response to respect the CategoryResponse schema.
      const response = {
        _id: newCategory._id,
        name: newCategory.name,
        description: newCategory.description,
      };
      res.status(201).json(response);
    } catch (error) {
      console.error("[CategoryController] Error creating category:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default CategoryController;
