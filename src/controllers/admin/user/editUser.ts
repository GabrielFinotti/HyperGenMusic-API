import { Request, Response } from "express";
import { UserInterface } from "../../../types";
import { userAdminService } from "../../../services";

const editUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body as Partial<UserInterface>;

    const result = await userAdminService.editUser(userId, userData);

    res.status(result.statusCode).json(
      result.success
        ? {
            success: true,
            message: result.message,
          }
        : {
            success: false,
            errors: result.errors,
          }
    );
  } catch (error) {
    console.error("Erro ao editar usuário:", error);

    res.status(500).send("Erro interno do servidor");
  }
};

export default editUser;
