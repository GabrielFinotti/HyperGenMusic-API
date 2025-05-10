import { NextFunction, Request, Response } from "express";
import { responseUtils } from "../../../utils";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      const err = responseUtils.createErrorResponse("Token not provided", 401);

      res.status(err.errorCode).send(err);

      return;
    }

    next();
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default verifyToken;
