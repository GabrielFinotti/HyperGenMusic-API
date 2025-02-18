import { Request, Response } from "express";
import { UserInterface } from "./../../interfaces/userInterface";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserInterface;

    console.log(userData);

    return res.sendStatus(201);
  } catch (error) {
    console.error(`Error registering user, ${error} ❌`.red.bgBlack);

    return res.sendStatus(500);
  }
};
