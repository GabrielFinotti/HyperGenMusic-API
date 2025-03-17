import { Request, Response, NextFunction } from "express";
import User from "../../models/userModel";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Obter userId do token JWT através do middleware authenticateToken
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "ID de usuário inválido" });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Acesso negado. Função de administrador necessária" });
    }

    // Adicione o usuário ao objeto de requisição para uso posterior
    req.user = user;
    next();
  } catch (error) {
    console.error(
      `Erro ao verificar permissões de administrador: ${error}`.red.bgBlack
    );

    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
