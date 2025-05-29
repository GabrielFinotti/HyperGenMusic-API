import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { UserServiceImpl } from "../../../services";
import { User } from "../../../models";
import { ResponseSuccess } from "../../../types";

const adminUpdateUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;
    const serviceResponse = await UserServiceImpl.userUpdate(userId, userData);

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<User>;

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
