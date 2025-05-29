import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { PlaylistServiceImpl } from "../../services";
import { PlaylistMusicData, ResponseSuccess } from "../../types";
import { PlaylistMusics } from "../../models";

const addMusicToPlaylist = async (req: Request, res: Response) => {
  try {
    const serviceResponse = await PlaylistServiceImpl.addMusicToPlaylist(
      req.body as PlaylistMusicData
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<PlaylistMusics>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while adding music to the playlist.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default addMusicToPlaylist;
