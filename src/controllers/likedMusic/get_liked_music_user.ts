import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { LikedMusicServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { Music } from "../../models";

const getLikedMusicUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const serviceResponse = await LikedMusicServiceImpl.getLikedMusicsByUserId(userId);

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<Music[]>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "Failed to retrieve liked music by user ID",
      500
    );
    res.status(err.errorCode).send(err);
  }
};

export default getLikedMusicUser;
