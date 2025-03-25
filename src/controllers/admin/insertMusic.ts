import { Request, Response } from "express";
import Music from "../../models/musicModel";
import path from "path";

type UploadedFiles = {
  music?: Express.Multer.File[];
  image?: Express.Multer.File[];
};

export const insertMusic = async (req: Request, res: Response) => {
  try {
    const { title, artist, genre, duration } = req.body;
    const files = req.files as UploadedFiles;

    if (!title || !duration || !files.music || files.music.length === 0) {
      res.status(400).json({
        error: "Os campos título, duração e arquivo de música são obrigatórios",
      });
      return;
    }

    const musicFile = files.music[0];
    const imageFile = files.image?.[0];

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const musicFileName = path.basename(musicFile.path);
    const imageFileName = imageFile ? path.basename(imageFile.path) : null;

    const songUrl = `${baseUrl}/uploads/music/${musicFileName}`;
    const imageUrl = imageFileName
      ? `${baseUrl}/uploads/images/${imageFileName}`
      : undefined;

    console.log(`Criando música com URL: ${songUrl}`);

    const newMusic = await Music.create({
      title: title.trim(),
      songUrl,
      duration: parseInt(duration as string, 10),
      imageUrl,
      artist: artist ? artist.trim() : null,
      genre: genre ? genre.trim() : null,
    });

    res.status(201).json({
      message: "Música inserida com sucesso",
      music: newMusic.toApiFormat(),
    });
  } catch (error) {
    console.error(`Erro ao inserir música: ${error}`.red.bgBlack);

    const errorMessage = error instanceof Error ? error.message : String(error);

    res.status(500).json({
      error: "Falha ao inserir a música no sistema.",
      details: errorMessage,
    });
  }
};
