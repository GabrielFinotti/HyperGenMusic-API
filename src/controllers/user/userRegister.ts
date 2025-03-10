import { Request, Response } from "express";
import { UserInterface } from "../../interfaces/userInterface";
import User from "../../models/userModel";
import { authUtils, userUtils } from "../../utils";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserInterface;

    const confirmUserData = authUtils.userAuth.userDataVerification(userData);

    if (confirmUserData instanceof Array) {
      return res.status(400).json({ errors: confirmUserData });
    }

    const existingUser = await userUtils.getUserData(
      undefined,
      userData.email,
      userData.username
    );

    if (existingUser) {
      return res
        .status(409)
        .json({ errors: ["Nome de usuário ou e-mail já existe!"] });
    }

    await User.create(userData);

    return res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error(`Erro ao registrar usuário, ${error}!`.red.bgBlack);

    return res.sendStatus(500);
  }
};
