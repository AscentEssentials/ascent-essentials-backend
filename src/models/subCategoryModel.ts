import mongoose, { Model, Schema } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       required:
 *         - name
 *         - categoryId
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category
 *         categoryId:
 *           type: string
 *           description: The id of the parent category
 *         description:
 *           type: string
 *           description: The description of the category
 *       example:
 *         name: "SubCategory 1"
 *         categoryId: "658ebceda502e738c6f01dec"
 *         description: "This is the description of SubCategory 1"
 *
 *     SubCategoryResponse:
 *       type: object
 *       required:
 *         - _id
 *         - name
 *         - categoryId
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         categoryId:
 *           type: string
 *           description: The id of the parent category
 *         description:
 *           type: string
 *           description: The description of the category
 *       example:
 *         _id: "658ebceda502e738c6f01dec"
 *         name: "SubCategory 1"
 *         categoryId: "658ebceda502e738c6f01dec"
 *         description: "This is the description of SubCategory 1"
 */

/**
 * Schema of a subcategory for MongoDB
 */
export interface ISubCategoryDocument extends mongoose.Document {
  name: string;
  categoryId: mongoose.Schema.Types.ObjectId;
  description?: string;
}

const subCategorySchema = new Schema<ISubCategoryDocument>({
  name: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
    validate: {
      validator: async function (value: mongoose.Types.ObjectId) {
        const category = await mongoose.model("Category").findById(value);
        return category !== null;
      },
      message: "Invalid category reference",
    },
  },
  description: String,
});

const subCategoryModel: Model<ISubCategoryDocument> = mongoose.model(
  "SubCategory",
  subCategorySchema
);

export default subCategoryModel;
