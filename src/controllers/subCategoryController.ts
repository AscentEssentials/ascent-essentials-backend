import { Request, Response } from "express";
import mongoose from "mongoose";
import SubCategoryModel, {
  ISubCategoryDocument,
} from "../models/subCategoryModel";

/**
 * Controller for handling subcategory-related operations.
 */
export class SubCategoryController {
  /**
   * Get all subcategories.
   */
  static async getAllSubCategories(req: Request, res: Response): Promise<void> {
    try {
      const subcategories: ISubCategoryDocument[] =
        await SubCategoryModel.find();
      // Response to respect the array of CategoryResponse schema.
      const response = subcategories.map((subcategory) => ({
        _id: subcategory._id,
        name: subcategory.name,
        categoryId: subcategory.categoryId,
        description: subcategory.description,
      }));
      res.status(200).json(response);
    } catch (error) {
      console.log(
        "[SubCategoryController] Error fetching subcategories:",
        error
      );
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Create a new subcategory.
   */
  static async createSubCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name, categoryId, description } = req.body;

      // Input validation, expected to be a string and should not be empty or only contain whitespace characters.
      if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof categoryId !== "string" ||
        !categoryId.trim()
      ) {
        console.error(
          "[SubCategoryController] Invalid or missing subcategory name"
        );
        res.status(400).send("Invalid or missing subcategory name");
        return;
      }

      const newSubCategory: ISubCategoryDocument = new SubCategoryModel({
        name,
        categoryId,
        description,
      });
      await newSubCategory.save();

      // Response to respect the SubCategoryResponse schema.
      const response = {
        _id: newSubCategory._id,
        name: newSubCategory.name,
        categoryId: newSubCategory.categoryId,
        description: newSubCategory.description,
      };
      res.status(201).json(response);
    } catch (error: unknown) {
      if (error instanceof mongoose.Error.ValidationError) {
        console.error(
          "[SubCategoryController] Error validating subcategory:",
          error
        );
        res.status(400).send(error.message);
      } else {
        console.error(
          "[SubCategoryController] Error creating subcategory:",
          error
        );
        res.status(500).send("Internal Server Error");
      }
    }
  }
}

export default SubCategoryController;