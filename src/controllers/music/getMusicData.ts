import { Request, Response } from "express";
import { musicService } from "../../services";

const getMusicData = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.musicId);
    const result = await musicService.getMusicData(musicId);

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro interno ao buscar dados da música: ${
        error instanceof Error ? error.message : String(error)
      }`
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro interno do servidor ao buscar dados da música",
    });
  }
};

export default getMusicData;
