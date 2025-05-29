import { Request, Response } from "express";
import { UserServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { responseUtils } from "../../utils";

const userDelete = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;

    const serviceResponse = await UserServiceImpl.userDelete(
      parseInt(req.params.userId),
      token
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal Server Error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userDelete;
