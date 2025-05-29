import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { LikedMusicServiceImpl } from "../../services";
import { LikedMusicData, ResponseSuccess } from "../../types";

const unlikeMusic = async (req: Request, res: Response) => {
  try {
    const serviceResponse = await LikedMusicServiceImpl.unlikeMusic(
      req.body as LikedMusicData
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<boolean>;

    res.status(result.statusCode).send(result);  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "Failed to unlike music",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default unlikeMusic;
