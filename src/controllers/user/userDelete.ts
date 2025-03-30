import { Request, Response } from "express";
import { userService } from "../../services";

const userDelete = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const authHeader = req.headers.authorization as string;

    const result = await userService.deleteUser(userId, authHeader);

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro ao excluir usuário: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro durante o processo de exclusão!",
    });
  }
};

export default userDelete;
