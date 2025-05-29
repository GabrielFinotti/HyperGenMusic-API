import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { UserServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { User } from "../../models";

const userLogin = async (req: Request, res: Response) => {
  try {
    const userData = req.body as {
      email: string;
      password: string;
      isLong: boolean;
    };

    const serviceResponse = await UserServiceImpl.userLogin(
      userData.email,
      userData.password,
      userData.isLong
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<
      (string | Partial<User>)[]
    >;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userLogin;
