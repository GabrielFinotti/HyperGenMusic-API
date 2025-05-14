import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { UserServiceImpl } from "../../services";
import { ResponseSuccess, UserData } from "../../types";
import { User } from "../../models";

const userUpdate = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const userDataUpdate = req.body as UserData;

    if (req.file) {
      userDataUpdate.imageUrl = (req.file as Express.MulterS3.File).location;
    }

    const isError = await UserServiceImpl.userUpdate(userId, userDataUpdate);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<User>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userUpdate;
