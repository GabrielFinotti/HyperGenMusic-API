import { Request, Response } from "express";
import User from "../../models/userModel";
import { UserInterface } from "../../interfaces/userInterface";
import { authUtils } from "../../utils";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserInterface;

    if (!userData.email || !userData.password) {
      res.status(400).json({ error: "Email e senha são obrigatórios!" });
      return;
    }

    const getProfile = await User.findOne({
      where: { email: userData.email },
      attributes: { include: ["password"] },
    });

    if (!getProfile) {
      res.status(404).json({ error: "Usuário não encontrado!" });
      return;
    }

    const isValidPassword = await getProfile.comparePassword(userData.password);

    if (!isValidPassword) {
      res.status(401).json({ error: "Senha inválida!" });
      return;
    }

    const token = await authUtils.jwt.generateToken(getProfile.id);

    if (typeof token !== "string") {
      res.status(500).json({ error: token.error });
      return;
    }

    res.status(200).json({
      message: "Usuário logado com sucesso!",
      token,
    });
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.sendStatus(500);
  }
};
