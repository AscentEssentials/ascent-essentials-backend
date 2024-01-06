import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel, { IUserDocument } from "../models/userModel";
import { AuthenticatedRequest, jwt_secret } from "../middleware/authentication";

export class UserController {
  /**
   * Registers a new user.
   *
   */
  static async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        surname,
        email,
        address,
        addressNumber,
        zipCode,
        telephoneNumber,
        password,
      } = req.body;

      // Check if the email is already registered
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        res.status(400).send("Email is already registered");
        return;
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: IUserDocument = new UserModel({
        name,
        surname,
        email,
        address,
        addressNumber,
        zipCode,
        telephoneNumber,
        password: hashedPassword,
      });

      await newUser.save();

      // Generate and send JWT token
      const token = jwt.sign({ userId: newUser._id }, jwt_secret, {
        expiresIn: "30d",
      });

      res.status(201).json({ token });
    } catch (error) {
      console.error("[UserController] Error registering user:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  /**
   * Logs in a user by validating the email and password,
   * and generates a JWT token upon successful authentication.
   *
   */
  static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Check if the email and password are present in the request
      if (!email || !password) {
        res.status(400).send("email or Password not present");
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

  /**
   * Returns the user details.
   *
   */
  static async getUserDetails(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<void> {
    try {
      const user = req.user as IUserDocument;

      // Response to match the UserResponse schema
      const response = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        address: user.address,
        addressNumber: user.addressNumber,
        zipCode: user.zipCode,
        telephoneNumber: user.telephoneNumber,
        isAdmin: user.isAdmin,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("[UserController] Error getting user details:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default UserController;
