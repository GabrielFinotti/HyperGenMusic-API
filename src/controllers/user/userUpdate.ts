import { Request, Response } from "express";
import { UserInterface } from "../../types";
import { userService } from "../../services";

const userUpdate = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body as Partial<UserInterface>;

    const result = await userService.updateUser(userId, userData);

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro ao atualizar usuário: ${
        error instanceof Error ? error.message : String(error)
      }!`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro durante o processo de atualização!",
    });
  }
};

export default userUpdate;
