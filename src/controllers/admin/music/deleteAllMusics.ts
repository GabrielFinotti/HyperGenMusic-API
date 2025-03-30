import { Request, Response } from "express";
import { musicAdminService } from "../../../services";

const deleteAllMusics = async (req: Request, res: Response) => {
  try {
    const result = await musicAdminService.deleteAllMusics();

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro ao excluir todas as músicas: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro interno do servidor ao excluir todas as músicas",
    });
  }
};

export default deleteAllMusics;
