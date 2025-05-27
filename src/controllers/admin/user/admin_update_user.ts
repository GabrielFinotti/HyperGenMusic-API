import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { UserServiceImpl } from "../../../services";
import { User } from "../../../models";
import { ResponseSuccess } from "../../../types";

const adminUpdateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    const isError = await UserServiceImpl.userUpdate(userId, userData);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<User>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while updating the user.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminUpdateUser;