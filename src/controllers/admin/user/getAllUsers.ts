import { Request, Response } from "express";
import { userAdminService } from "../../../services";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userAdminService.getAllUsers();

    if (!result) {
      res.status(404).json({ message: "Nenhum usuário encontrado" });
      return;
    }

    res
      .status(200)
      .json({ message: `${result.length} usuários encontrados`, result });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);

    res.status(500).json({
      message: `Error ao buscar usuários: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
};

export default getAllUsers;
