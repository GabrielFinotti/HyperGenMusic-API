import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { AdminServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";

const adminDeleteMusic = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.musicId);

    const isError = await AdminServiceImpl.deleteMusic(musicId);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while deleting music",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminDeleteMusic;
