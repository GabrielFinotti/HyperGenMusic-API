import { Request, Response } from "express";
import { musicService } from "../../services";

const searchMusics = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    const limit = req.query.limit
      ? parseInt(req.query.limit as string)
      : undefined;

    const musics = await musicService.searchMusics(query, limit);

    if (musics.length === 0) {
      res.status(404).json({ message: "Nenhuma música encontrada" });
      return;
    }

    res
      .status(200)
      .json({ message: `${musics.length} músicas encontradas`, musics });
  } catch (error) {
    console.error(`Erro ao buscar músicas: ${error}`);

    res.status(500).json({
      message: `Erro ao buscar músicas: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
};

export default searchMusics;
