import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { AdminServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";

const adminDeleteAllUsers = async (req: Request, res: Response) => {
  try {
    const serviceResponse = await AdminServiceImpl.deleteAllUsers();

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while deleting all users.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminDeleteAllUsers;
