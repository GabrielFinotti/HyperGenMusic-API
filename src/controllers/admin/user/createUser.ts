import { Request, Response } from "express";
import { userAdminService } from "../../../services";
import { UserInterface } from "../../../types";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserInterface;
    const result = await userAdminService.createUser(userData);

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro ao registrar usuário: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro interno do servidor ao registrar usuário",
    });
  }
};

export default createUser;
