import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel, { IUserDocument } from "../models/userModel";

export const jwt_secret =
  process.env.JWT_SECRET || "a-really-(in)secure-secret-key";

export interface AuthenticatedRequest extends Request {
  user?: IUserDocument;
}

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).send("Unauthorized");

  try {
    const userId = getUserIdFromToken(token);
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(401).send("Invalid user.");
    }

    req.user = user; // Store user details on req.user
    next();
  } catch (error) {
    console.error("[AuthMiddleware] Error:", error);
    res.status(401).send("Invalid token.");
  }
};

export const isAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUserDocument;

  if (!user || !user.isAdmin) {
    console.error("[AuthMiddleware] Access denied. User is not an admin.");
    return res.status(403).send("Access denied. User is not an admin.");
  }

  next();
};

export const getUserIdFromToken = (token: string): string => {
  const decoded: any = jwt.verify(token, jwt_secret);
  return decoded.userId;
};
