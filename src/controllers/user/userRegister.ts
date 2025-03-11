import { Request, Response } from "express";
import { UserInterface } from "../../interfaces/userInterface";
import User from "../../models/userModel";
import { authUtils, userUtils } from "../../utils";

export const userRegister = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserInterface;

    const confirmUserData = authUtils.userAuth.userDataVerification(userData);

    if (confirmUserData instanceof Array) {
      res.status(400).json({ errors: confirmUserData });
      return;
    }

    const existingUser = await userUtils.getUserData(
      undefined,
      userData.email,
      userData.username
    );

    if (existingUser) {
      res
        .status(409)
        .json({ errors: ["Nome de usuário ou e-mail já existe!"] });
      return;
    }

    await User.create(userData);

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error(`Erro ao registrar usuário, ${error}!`.red.bgBlack);

    res.sendStatus(500);
  }
};
