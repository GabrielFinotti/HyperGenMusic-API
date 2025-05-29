import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { PlaylistServiceImpl } from "../../services";
import { PlaylistData, ResponseSuccess } from "../../types";
import { Playlist } from "../../models";

const updatePlaylist = async (req: Request, res: Response) => {
  try {
    const playlistId = parseInt(req.params.playlistId);
    const playlistData = req.body as PlaylistData;

    const serviceResponse = await PlaylistServiceImpl.updatePlaylist(
      playlistId,
      playlistData
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<Playlist>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while updating the playlist.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default updatePlaylist;
