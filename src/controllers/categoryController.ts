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
      res.status(200).json(categories);
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
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("[CategoryController] Error creating category:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default CategoryController;
