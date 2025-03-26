import { Request, Response } from "express";
import { UserInterface } from "../../types";
import { userService } from "../../services";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserInterface;
    const result = await userService.register(userData);

    res
      .status(result.statusCode)
      .json(
        result.success
          ? { message: result.message }
          : result.errors
          ? { errors: result.errors }
          : { errors: result.message }
      );
  } catch (error) {
    console.error(`Erro ao registrar usuário, ${error}!`.red.bgBlack);
    
    res.sendStatus(500);
  }
};
