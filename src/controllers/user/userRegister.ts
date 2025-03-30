import { Request, Response } from "express";
import { UserInterface } from "../../types";
import { userService } from "../../services";

const userRegister = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserInterface;
    const result = await userService.register(userData);

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro ao registrar usuário, ${
        error instanceof Error ? error.message : String(error)
      }!`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro durante o processo de registro!",
    });
  }
};

export default userRegister;
