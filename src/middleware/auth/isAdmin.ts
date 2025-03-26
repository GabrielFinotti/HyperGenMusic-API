import { Request, Response, NextFunction } from "express";
import User from "../../models/userModel";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      res.status(400).json({ message: "ID de usuário inválido" });
      return;
    }

    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    if (user.role !== "admin") {
      res
        .status(403)
        .json({ message: "Acesso negado. Função de administrador necessária" });
      return;
    }

    next();
  } catch (error) {
    console.error(
      `Erro ao verificar permissões de administrador: ${error}`.red.bgBlack
    );

    res.status(500).json({ message: "Erro interno do servidor" });
    return;
  }
};

export default isAdmin;
