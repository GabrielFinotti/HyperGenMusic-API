import { Request, Response } from "express";
import { UserServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { responseUtils } from "../../utils";

const userDelete = async (req: Request, res: Response) => {
  try {
    const isError = await UserServiceImpl.userDelete(
      parseInt(req.params.userId)
    );

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse("Internal Server Error", 500);

    res.status(err.errorCode).send(err);
  }
};

export default userDelete;
