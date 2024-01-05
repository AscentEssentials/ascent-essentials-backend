import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel, { IUserDocument } from "../models/userModel";

const jwt_secret = process.env.JWT_SECRET || "a-really-secure-secret-key";

export class UserController {
  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, surname, email, address, telephoneNumber, password } =
        req.body;

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: IUserDocument = new UserModel({
        name,
        surname,
        email,
        address,
        telephoneNumber,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).send("User registered successfully");
    } catch (error) {
      console.error("[UserController] Error registering user:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Check if the email and password are present in the request
      if (!email || !password) {
        res.status(400).send("Username or Password not present");
        return;
      }

      // Find the user by email
      const user: IUserDocument | null = await UserModel.findOne({ email });
      if (!user) {
        res.status(401).send("Invalid email or password");
        return;
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).send("Invalid email or password");
        return;
      }

      // Generate and send JWT token
      const token = jwt.sign({ userId: user._id }, jwt_secret, {
        expiresIn: "30d",
      });
      res.status(200).json({ token });
    } catch (error) {
      console.error("[UserController] Error logging in user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default UserController;
