import { Request, Response } from "express";
import { UserInterface } from "../../../types";
import { userAdminService } from "../../../services";

const editUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body as Partial<UserInterface>;

    const result = await userAdminService.editUser(userId, userData);

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro ao editar usuário: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro interno do servidor ao editar usuário",
    });
  }
};

export default editUser;
