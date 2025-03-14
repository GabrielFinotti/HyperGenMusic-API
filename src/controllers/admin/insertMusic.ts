import { Request, Response } from "express";
import Music from "../../models/musicModel";
import { MusicInterface } from "../../interfaces/musicInterface";

export const insertMusic = async (req: Request, res: Response) => {
  try {
    const dataFiles = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    if (!dataFiles["music"]) {
      res.status(400).json({ message: "Um arquivo de audio é obrigatório!" });
      return;
    }

    const dataMusic: MusicInterface = {
      title: req.body.title,
      songUrl: `/uploads/musics/${dataFiles["music"][0].filename}`,
      duration: req.body.duration || 0,
      imageUrl: dataFiles["image"]
        ? `/uploads/images/${dataFiles["image"][0].filename}`
        : undefined,
      artist: req.body.artist,
      genre: req.body.genre,
    };

    const newMusic = await Music.create(dataMusic);

    res.status(201).json({
      message: "Música inserida com sucesso",
      music: newMusic.toApiFormat(),
    });
  } catch (error) {
    console.error(`Erro durante a inserção da música: ${error}`.red.bgBlack);
    res.status(500).json({ message: "Erro durante o registro da música" });
  }
};
