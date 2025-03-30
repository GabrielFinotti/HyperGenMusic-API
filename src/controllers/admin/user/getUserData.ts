import { Request, Response } from "express";
import { userAdminService } from "../../../services";

const getUserData = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await userAdminService.getUserData(userId);

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro ao obter dados do usuário: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro interno do servidor ao obter dados do usuário",
    });
  }
};

export default getUserData;
