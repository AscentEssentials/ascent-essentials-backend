import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - address
 *         - addressNumber
 *         - zipCode
 *         - telephoneNumber
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         surname:
 *           type: string
 *           description: The surname of the user
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *         addressNumber:
 *           type: string
 *           description: The address number of the user
 *         zipCode:
 *           type: string
 *           description: The zip code of the user's address
 *         telephoneNumber:
 *           type: string
 *           description: The telephone number of the user
 *         password:
 *           type: string
 *           format: password
 *           description: The password of the user
 *       example:
 *         name: "John"
 *         surname: "Doe"
 *         email: "john.doe@example.com"
 *         address: "123 Main Street, City"
 *         addressNumber: "456"
 *         zipCode: "12345"
 *         telephoneNumber: "+1234567890"
 *         password: "securepassword"
 */

export interface IUserDocument extends Document {
  name: string;
  surname: string;
  email: string;
  address: string;
  addressNumber: string;
  zipCode: string;
  telephoneNumber: string;
  password: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Using unique: true implies the creation of an index
    address: { type: String, required: true },
    addressNumber: { type: String, required: true },
    zipCode: { type: String, required: true },
    telephoneNumber: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // automatically adds two fields to the schema: createdAt and updatedAt
);

const UserModel: Model<IUserDocument> = mongoose.model("User", userSchema);
export default UserModel;
