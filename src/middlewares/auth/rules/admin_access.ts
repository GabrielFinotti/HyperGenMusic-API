import { NextFunction, Request, Response } from "express";
import { UserServiceImpl } from "../../../services";
import { responseUtils } from "../../../utils";
import { ResponseSuccess } from "../../../types";
import { User } from "../../../models";

const adminAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isError = await UserServiceImpl.getProfileData(
      parseInt(req.params.userId)
    );

    if (!isError.success) {
      const err = responseUtils.createErrorResponse("User not found", 404);

      res.status(err.errorCode).send(err);

      return;
    }

    const user = isError as ResponseSuccess<User>;

    if (user.data?.role !== "admin" && user.data?.role !== "dev") {
      const err = responseUtils.createErrorResponse("Unauthorized", 401);

      res.status(err.errorCode).send(err);

      return;
    }

    next();
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default adminAccess;
