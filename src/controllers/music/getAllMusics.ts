import { Request, Response } from "express";
import { musicService } from "../../services";

const getAllMusics = async (req: Request, res: Response) => {
  try {
    const musics = await musicService.getAllMusic();

    if (musics.length === 0) {
      res.status(404).json({ message: "Nenhuma música encontrada" });
      return;
    }

    res
      .status(200)
      .json({ message: "Músicas recuperadas com sucesso", musics });
  } catch (error) {
    console.error(`Erro ao buscar músicas: ${error}`.red.bgBlack);

    res.status(500).json({ message: "Erro ao buscar músicas" });
  }
};

export default getAllMusics;
