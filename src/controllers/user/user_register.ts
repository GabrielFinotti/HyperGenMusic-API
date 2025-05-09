import { Request, Response } from "express";
import { ResponseSuccess, UserData } from "../../types";
import { UserServiceImpl } from "../../services";
import { User } from "../../models";
import { responseUtils } from "../../utils";

const userRegister = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserData;

    const isError = await UserServiceImpl.userRegister(userData);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<User>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    console.error(`Error in userRegister controller: ${error}`);

    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userRegister;
