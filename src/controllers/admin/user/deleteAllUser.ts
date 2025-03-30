import { Request, Response } from "express";
import { userAdminService } from "../../../services";

const deleteAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userAdminService.deleteAllUsers();

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro ao excluir todos os usuários: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro interno do servidor ao excluir todos os usuários",
    });
  }
};

export default deleteAllUser;
