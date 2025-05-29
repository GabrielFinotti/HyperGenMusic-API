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

    const serviceResponse = await UserServiceImpl.userUpdate(
      userId,
      userDataUpdate
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<User>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal server error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userUpdate;
