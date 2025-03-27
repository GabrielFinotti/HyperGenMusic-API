import { Request, Response } from "express";
import { musicAdminService } from "../../services";
import { UploadedFiles } from "../../types";

const insertMusic = async (req: Request, res: Response) => {
  try {
    const { title, artist, genre, duration } = req.body;
    const files = req.files as UploadedFiles;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const result = await musicAdminService.insertMusic(
      title,
      duration,
      files,
      artist,
      genre,
      baseUrl
    );

    res
      .status(result.statusCode)
      .json(
        result.success
          ? { message: "Música inserida com sucesso", music: result.music }
          : { error: result.error }
      );
  } catch (error) {
    console.error(`Erro inesperado ao inserir música: ${error}`.red.bgBlack);

    res.status(500).json({ error: "Falha ao inserir música no sistema" });
  }
};

export default insertMusic;
