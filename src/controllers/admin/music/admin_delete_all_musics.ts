import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { AdminServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";

const adminDeleteAllMusics = async (req: Request, res: Response) => {
  try {
    const isError = await AdminServiceImpl.deleteAllMusic();

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while deleting all musics",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminDeleteAllMusics;
