import { Request, Response } from "express";
import { musicAdminService } from "../../../services";

const deleteMusicById = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.musicId);
    
    const result = await musicAdminService.deleteMusic(musicId);

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro inesperado ao excluir música: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro interno do servidor ao excluir música",
    });
  }
};

export default deleteMusicById;
