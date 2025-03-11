import { Request, Response } from "express";
import { userUtils } from "../../utils";

export const userData = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    const userData = await userUtils.getUserData(userId);

    if (!userData) {
      res.status(404).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json(userData.toPublicJSON());
  } catch (error) {
    console.error(`Erro ao obter dados do usuário: ${error}`.red.bgBlack);

    res.status(500).json({ message: "Erro interno do servidor!" });
  }
};
