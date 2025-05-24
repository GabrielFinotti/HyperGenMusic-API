import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { MusicServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { Music } from "../../models";

const getAllMusic = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    
    let limit = parseInt(query.limit as string);

    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }

    let offset = parseInt(query.offset as string);

    if (isNaN(offset) || offset < 0) {
      offset = 0;
    }

    const isError = await MusicServiceImpl.getAllMusic(limit, offset);

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const result = isError as ResponseSuccess<Music[]>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching music.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default getAllMusic;
