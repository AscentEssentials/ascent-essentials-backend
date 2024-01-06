import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const jwt_secret = process.env.JWT_SECRET || "a-really-(in)secure-secret-key";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) return res.status(401).send("Unauthorized");

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) return res.status(403).send("Forbidden");

    next();
  });
};

