import { Request, Response } from "express";
import { musicService } from "../../services";

export const getMusics = async (req: Request, res: Response) => {
  try {
    const musics = await musicService.getAllMusic();
    const formattedMusics = musics.map((music) => music.toApiFormat());
    
    res.status(200).json(formattedMusics);
  } catch (error) {
    console.error(`Erro ao recuperar músicas: ${error}`.red.bgBlack);
    res.status(500).send({ message: `Erro ao recuperar músicas!` });
  }
};
