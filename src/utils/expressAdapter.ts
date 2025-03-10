import { Request, Response, NextFunction } from "express";

export const adaptController = (controller: (req: Request, res: Response) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res)
      .then(() => {})
      .catch(next);
  };
};
