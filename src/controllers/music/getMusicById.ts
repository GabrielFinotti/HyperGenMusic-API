import { Request, Response } from "express";
import Music from "../../models/musicModel";

export const getMusicById = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.id);

    if (isNaN(musicId)) {
      res.status(400).json({ error: "ID de música inválido" });
      return;
    }

    const music = await Music.findByPk(musicId);

    if (!music) {
      res.status(404).json({ error: "Música não encontrada" });
      return;
    }

    res.status(200).json(music.toApiFormat());
  } catch (error) {
    console.error(`Erro ao recuperar dados da música: ${error}`.red.bgBlack);

    res.status(500).json({ error: "Falha ao recuperar dados da música" });
  }
};
