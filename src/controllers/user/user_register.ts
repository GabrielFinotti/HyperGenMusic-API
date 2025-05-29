import { Request, Response } from "express";
import { ResponseSuccess, UserData } from "../../types";
import { UserServiceImpl } from "../../services";
import { responseUtils } from "../../utils";

const userRegister = async (req: Request, res: Response) => {
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
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userRegister;
