import { Request, Response } from "express";
import { userAdminService } from "../../../services";
import { UserInterface } from "../../../types";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body as UserInterface;
    const result = await userAdminService.createUser(userData);

    res
      .status(result.statusCode)
      .json(
        result.success
          ? { message: result.message }
          : result.errors
          ? { errors: result.errors }
          : { errors: result.message }
      );
  } catch (error) {
    console.error(`Erro ao registrar usuário, ${error}!`.red.bgBlack);

    res.status(500).send("Erro interno do servidor!");
  }
};

export default createUser;
