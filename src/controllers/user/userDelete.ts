import { Request, Response } from "express";
import { userService } from "../../services";

export const userDelete = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Não autorizado!" });
      return;
    }

    const result = await userService.deleteUser(userId, authHeader);

    res
      .status(result.statusCode)
      .json(
        result.success
          ? { message: result.message }
          : { message: result.message }
      );
  } catch (error) {
    console.error(`Erro ao excluir usuário: ${error}`.red.bgBlack);

    res.status(500).json({ message: "Erro interno do servidor!" });
  }
};
