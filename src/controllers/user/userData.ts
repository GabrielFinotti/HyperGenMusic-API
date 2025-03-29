import { Request, Response } from "express";
import { userService } from "../../services";

const userData = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const result = await userService.getUserById(userId);

    res
      .status(result.statusCode)
      .json(result.success ? result.user : { message: result.message });
  } catch (error) {
    console.error(`Erro ao obter dados do usuário: ${error}`.red.bgBlack);

    res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

export default userData;
