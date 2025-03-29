import { Request, Response } from "express";
import { userAdminService } from "../../../services";

const searchUser = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined;

    const result = await userAdminService.searchUser(query, limit);

    if (result.length === 0) {
      res.status(404).json({ message: "Nenhum usuário encontrado" });
      return;
    }

    res.status(200).json({
      message: `${result.length} usuários encontrados`,
      users: result,
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);

    res.status(500).json({
      message: `Erro ao buscar usuários: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
};

export default searchUser;
