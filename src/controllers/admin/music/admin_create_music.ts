import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { AdminServiceImpl } from "../../../services";
import { MusicData, ResponseSuccess } from "../../../types";

const adminCreateMusic = async (req: Request, res: Response) => {
  try {
    const musicData = req.body as MusicData;

    const files = req.files as Express.MulterS3.File[];

    if (files.length === 0) {
      const err = responseUtils.createErrorResponse(
        "No files were uploaded",
        400
      );
      res.status(err.errorCode).send(err);

      return;
    }

    musicData.songUrl = files[0].location;

    if (files[1]) {
      musicData.imageUrl = files[1].location;
    }

    const isError = await AdminServiceImpl.createMusic(musicData);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<null>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while creating music",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminCreateMusic;
