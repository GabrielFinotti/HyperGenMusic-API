import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { PlaylistServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";

const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const playlistId = parseInt(req.params.playlistId);

    const serviceResponse = await PlaylistServiceImpl.deletePlaylist(
      playlistId
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<boolean>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while deleting the playlist.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default deletePlaylist;
