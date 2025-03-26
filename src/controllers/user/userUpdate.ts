import { Request, Response } from "express";
import { UserInterface } from "../../types";
import { userService } from "../../services";

export const userUpdate = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body as Partial<UserInterface>;

    const result = await userService.updateUser(userId, userData);

    res
      .status(result.statusCode)
      .json(
        result.success
          ? { message: result.message }
          : result.errors
          ? { errors: result.errors }
          : { error: result.message }
      );
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
