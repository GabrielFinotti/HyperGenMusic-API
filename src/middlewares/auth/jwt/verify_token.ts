import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { responseUtils } from "../../../utils";

dotenv.config();

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      const err = responseUtils.createErrorResponse("Token not provided", 401);

      res.status(err.errorCode).send(err);

      return;
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY as string);

    if (typeof decode === "string") {
      const err = responseUtils.createErrorResponse("Invalid token", 401);

      res.status(err.errorCode).send(err);

      return;
    }

    req.params.userId = decode.userId as string;

    next();
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default verifyToken;
