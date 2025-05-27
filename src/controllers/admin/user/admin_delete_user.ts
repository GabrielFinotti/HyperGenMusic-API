import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { UserServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";
import { User } from "../../../models";

const adminDeleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId) || userId <= 0) {
      const err = responseUtils.createErrorResponse(
        "Invalid user ID provided.",
        400
      );

      res.status(err.errorCode).send(err);

      return;
    }

    const userData = await UserServiceImpl.getProfileData(userId);

    if (!userData.success) {
      res.status(userData.errorCode).send(userData);

      return;
    }

    const lastToken = (userData as ResponseSuccess<User>).data?.lastToken;

    const isError = await UserServiceImpl.userDelete(userId, lastToken);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while deleting the user.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminDeleteUser;
