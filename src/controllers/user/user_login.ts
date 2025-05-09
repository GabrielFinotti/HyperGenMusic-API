import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { UserServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { User } from "../../models";

const userLogin = async (req: Request, res: Response) => {
  try {
    const userData = req.body as { email: string; password: string };

    const isError = await UserServiceImpl.userLogin(
      userData.email,
      userData.password
    );

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<User>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    console.error(`Error in userLogin controller: ${error}`);

    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userLogin;
