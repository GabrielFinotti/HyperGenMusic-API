import { Request, Response } from "express";
import { userUtils, authUtils } from "../../utils";

export const userDelete = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const authHeader = req.headers.authorization;

    const userData = await userUtils.getUserData(userId);

    if (!userData) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    if (!authHeader) {
      return res.status(401).json({ message: "Não autorizado!" });
    }

    const revogeToken = await authUtils.jwt.deleteToken(authHeader);

    if (revogeToken.error) {
      return res
        .status(400)
        .json({ message: `Erro ao excluir usuário: ${revogeToken.error}` });
    }

    await userData.destroy();

    return res
      .status(200)
      .json({ message: `Usuário excluído com sucesso, ${revogeToken.message}!` });
  } catch (error) {
    console.error(`Erro ao excluir usuário: ${error}`.red.bgBlack);

    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};
