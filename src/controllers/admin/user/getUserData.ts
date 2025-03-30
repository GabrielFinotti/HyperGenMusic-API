import { Request, Response } from "express";
import { userAdminService } from "../../../services";

const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await userAdminService.getUserData(userId);

    res
      .status(result.statusCode)
      .json(
        result.success
          ? { message: result.message, user: result.user }
          : result.errors
          ? { errors: result.errors }
          : { errors: result.message }
      );
  } catch (error) {
    console.error(`Erro ao obter dados do usuário, ${error}!`.red.bgBlack);

    res.status(500).send("Erro interno do servidor!");
  }
};

export default getUserData;
