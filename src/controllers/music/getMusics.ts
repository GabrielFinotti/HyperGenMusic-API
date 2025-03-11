import { Request, Response } from "express";
import Music from "../../models/musicModel";

export const getMusics = async (req: Request, res: Response) => {
  try {
    const musics = await Music.findAll();

    const formattedMusics = musics.map((music) => music.toApiFormat());

    res.status(200).json(formattedMusics);
  } catch (error) {
    console.error(`Erro ao recuperar músicas: ${error}`.red.bgBlack);

    res.status(500).send({ message: `Erro ao recuperar músicas!` });
  }
};
