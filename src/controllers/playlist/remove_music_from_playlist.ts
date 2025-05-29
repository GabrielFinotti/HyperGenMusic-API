import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { PlaylistServiceImpl } from "../../services";
import { PlaylistMusicData, ResponseSuccess } from "../../types";

const removeMusicFromPlaylist = async (req: Request, res: Response) => {
  try {
    const serviceResponse = await PlaylistServiceImpl.removeMusicFromPlaylist(
      req.body as PlaylistMusicData
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<boolean>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while removing music from the playlist.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default removeMusicFromPlaylist;
