import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { UserServiceImpl } from "../../../services";
import { ResponseSuccess, UserData } from "../../../types";

const adminCreateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserData;
    const serviceResponse = await UserServiceImpl.userRegister(userData);

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while creating user.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminCreateUser;
