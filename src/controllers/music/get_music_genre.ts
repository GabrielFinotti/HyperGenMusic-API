import { Request, Response } from "express";
import { responseUtils } from "../../utils";
import { MusicServiceImpl } from "../../services";
import { ResponseSuccess } from "../../types";
import { Music } from "../../models";

const getMusicGenre = async (req: Request, res: Response) => {
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

    if (!query.genre) {
      const err = responseUtils.createErrorResponse("Genre is required.", 400);

      res.status(err.errorCode).send(err);

      return;
    }
    const serviceResponse = await MusicServiceImpl.getMusicByGenre(
      query.genre as string,
      limit,
      offset
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const result = serviceResponse as ResponseSuccess<Music[]>;

    res.status(result.statusCode).send(result);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching music genre.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default getMusicGenre;
