import * as dotenv from "dotenv";

import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();
const secretKey = process.env.JWT_SECRET;

// Define interfaces for user and role
interface User {
  // Define properties of the user object
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

type Role = string;

declare global {
  namespace Express {
    interface Request {
      user?: User; // Define the type for req.user
      role?: Role; // Define the type for req.role
    }
  }
}

if (!secretKey) {
  throw new Error("JWT_SECRET not defined in environment variables");
}

// Generate JWT Tokens
export const generateToken = ({ user, role }: { user: User; role: Role }) => {
  const token = jwt.sign({ user, role }, secretKey, { expiresIn: "30d" });
  return token;
};

// Verify JWT Tokens
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json("Unauthorized");
    }
    req.user = decoded.user as User;
    req.role = decoded.role as Role;

    next();
  });
};

// Checking if its an admin making the request
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.role != "admin") {
    return res
      .status(401)
      .json({ message: "You are not authorized to view the data" });
  }
  next();
};

// Checks if its a User making the request
export const isStaff = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "Staff") {
    return res.status(401).json({ message: "Not authorized" });
  }
  next();
};

// Checks if its a User making the request
export const isUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== "user") {
    return res.status(401).json({ message: "Not authorized" });
  }
  next();
};
