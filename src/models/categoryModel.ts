import mongoose, { Model, Schema } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category
 *         description:
 *           type: string
 *           description: The description of the category
 *       example:
 *         name: "Category 1"
 *         description: "This is the description of Category 1"
 */

/**
 * Schema of a category for MongoDB
 */
export interface ICategoryDocument extends mongoose.Document{
    name: string;
    description?: string;
}

const categorySchema = new Schema<ICategoryDocument>({
    name: {type: String, required: true},
    description: String
});

const categoryModel: Model<ICategoryDocument> = mongoose.model('Category', categorySchema);
export default categoryModel;