import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { MusicServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { Music } from "../../models";

const getMusicData = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.musicId as string);

    if (isNaN(musicId)) {
      const err = responseUtils.createErrorResponse(
        "Invalid music ID provided.",
        400
      );

      res.status(err.errorCode).send(err);

      return;
    }
    const serviceResponse = await MusicServiceImpl.getMusicData(musicId);

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<Music>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching music data.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default getMusicData;
