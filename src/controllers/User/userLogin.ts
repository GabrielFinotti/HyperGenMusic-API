import { Request, Response } from "express";

export const userLogin =  (req: Request, res: Response) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};
