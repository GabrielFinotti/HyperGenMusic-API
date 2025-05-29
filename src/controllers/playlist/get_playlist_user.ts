import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { Playlist } from "../../models";
import { PlaylistServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";

const getPlaylistUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const serviceResponse = await PlaylistServiceImpl.getPlaylistByUserId(
      userId
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<Playlist[]>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching the playlist user.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default getPlaylistUser;
