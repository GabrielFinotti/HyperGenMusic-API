import { Request, Response } from "express";
import User from "../../models/userModel";
import { UserInterface } from "../../interfaces/userInterface";
import { authUtils, userUtils } from "../../utils";

export const userUpdate = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body as Partial<UserInterface>;

    const validatedUserData =
      authUtils.userAuth.updateDataVerification(userData);

    if (Array.isArray(validatedUserData)) {
      res.status(400).json({ errors: validatedUserData });
      return;
    }

    const user = await User.findOne({
      where: { id: userId },
      attributes: {
        include: validatedUserData.password ? ["password"] : [],
      },
    });

    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado!" });
      return;
    }

    const result = await userUtils.userDataUpdate(validatedUserData, user);

    if ("error" in result) {
      res.status(400).json({ error: result.error });
      return;
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
