import { Request, Response } from "express";
import { userService } from "../../services";

const userData = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await userService.getUserById(userId);

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro ao obter dados do usuário: ${
        error instanceof Error ? error.message : String(error)
      }!`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro durante o processo de recuperação dos dados!",
    });
  }
};

export default userData;
