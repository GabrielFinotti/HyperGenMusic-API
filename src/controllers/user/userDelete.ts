import { Request, Response } from "express";
import { userUtils, authUtils } from "../../utils";

export const userDelete = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const authHeader = req.headers.authorization;

    const userData = await userUtils.getUserData(userId);

    if (!userData) {
      res.status(404).json({ message: "Usuário não encontrado!" });
      return;
    }

    if (!authHeader) {
      res.status(401).json({ message: "Não autorizado!" });
      return;
    }

    const revogeToken = await authUtils.jwt.deleteToken(authHeader);

    if (revogeToken.error) {
      res
        .status(400)
        .json({ message: `Erro ao excluir usuário: ${revogeToken.error}` });
      return;
    }

    await userData.destroy();

    res.status(200).json({
      message: `Usuário excluído com sucesso, ${revogeToken.message}!`,
    });
  } catch (error) {
    console.error(`Erro ao excluir usuário: ${error}`.red.bgBlack);

    res.status(500).json({ message: "Erro interno do servidor!" });
  }
};
