import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { LikedMusicServiceImpl } from "../../services";
import { LikedMusicData, ResponseSuccess } from "../../types";

const checkIfUserLikedMusic = async (req: Request, res: Response) => {
  try {
    const serviceResponse = await LikedMusicServiceImpl.checkIfUserLikedMusic(
      req.body as LikedMusicData
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<boolean>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "Failed to check if user liked music",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default checkIfUserLikedMusic;
