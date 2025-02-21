import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access denied!" });
    }

    jwt.verify(token, process.env.SECRET_KEY as string, (error, payload) => {
      if (error) {
        return res.status(403).json({ error: "Token is not valid!" });
      }

      if (payload && typeof payload === "object") {
        req.params.id = payload.userId;

        return next();
      }
    });
  } catch (error) {
    console.error(
      `Error when trying to authenticate token: ${error}!`.red.bgBlack
    );

    return res.status(500).json({ error: "Server error!" });
  }
};
