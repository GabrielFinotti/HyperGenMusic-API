import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { MusicData, ResponseSuccess } from "../../../types";
import { AdminServiceImpl } from "../../../services";
import { Music } from "../../../models";

const adminUpdateMusic = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.musicId);
    const musicData = req.body as Partial<MusicData>;

    const isError = await AdminServiceImpl.updateMusic(musicId, musicData);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<Music>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while updating music",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminUpdateMusic;
