import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { MusicData, ResponseSuccess } from "../../../types";
import { AdminServiceImpl } from "../../../services";
import { Music } from "../../../models";

const adminUpdateMusic = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.musicId);
    const musicData = req.body as Partial<MusicData>;
    const serviceResponse = await AdminServiceImpl.updateMusic(
      musicId,
      musicData
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<Music>;

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
