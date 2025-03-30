import { Request, Response } from "express";
import { userAdminService } from "../../../services";

const deleteAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userAdminService.deleteAllUsers();

    res
      .status(result.statusCode)
      .json(
        result.success
          ? { message: result.message, users: result.user }
          : result.errors
          ? { errors: result.errors }
          : { errors: result.message }
      );
  } catch (error) {
    console.error(`Erro ao deletar usuários, ${error}!`.red.bgBlack);

    res.status(500).send("Erro interno do servidor!");
  }
};

export default deleteAllUser;
