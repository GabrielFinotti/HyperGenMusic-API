import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { AdminServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";
import { User } from "../../../models";

const adminGetUsersTerm = async (req: Request, res: Response) => {
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

    const isError = await AdminServiceImpl.getUserByTerm(
      query.term as string,
      limit,
      offset
    );

    if (!isError.success) {
      res.status(isError.errorCode).send(isError);

      return;
    }

    const users = isError as ResponseSuccess<User[]>;

    res.status(users.statusCode).send(users);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching users.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminGetUsersTerm;
