import { Request, Response } from "express";
import { musicService } from "../../services";

const getMusicData = async (req: Request, res: Response) => {
  try {
    const result = await musicService.getMusicData(
      parseInt(req.params.musicId)
    );

    res.status(200).json({
      message: "Música recuperada com sucesso",
      result,
    });
  } catch (error) {
    console.error(`Erro ao buscar música: ${error}`.red.bgBlack);

    res.status(500).json({
      message: `Erro ao buscar música: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
};

export default getMusicData;
