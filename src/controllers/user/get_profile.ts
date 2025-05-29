import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { UserServiceImpl } from "../../services";
import { User } from "../../models";
import { ResponseSuccess } from "../../types";

const getProfile = async (req: Request, res: Response) => {
  try {
    const serviceResponse = await UserServiceImpl.getProfileData(
      parseInt(req.params.userId)
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<User>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal Server Error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default getProfile;
