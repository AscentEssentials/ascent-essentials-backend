import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUserDocument extends Document {
  name: string;
  surname: string;
  email: string;
  address: string;
  telephoneNumber: string;
  password: string;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Using unique: true implies the creation of an index
    address: { type: String, required: true },
    telephoneNumber: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true } // automatically adds two fields to the schema: createdAt and updatedAt
);

const UserModel: Model<IUserDocument> = mongoose.model("User", userSchema);
export default UserModel;
