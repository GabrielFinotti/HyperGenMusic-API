import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { PlaylistServiceImpl } from "../../services";
import { PlaylistMusics } from "../../models";
import { ResponseSuccess } from "../../types";

const getMusicPlaylist = async (req: Request, res: Response) => {
  try {
    const playlistId = parseInt(req.params.playlistId);

    const serviceResponse = await PlaylistServiceImpl.getMusicsByPlaylistId(
      playlistId
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<PlaylistMusics[]>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while retrieving the music playlist.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default getMusicPlaylist;
