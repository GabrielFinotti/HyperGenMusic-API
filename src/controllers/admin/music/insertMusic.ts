import { Request, Response } from "express";
import { musicAdminService } from "../../../services";
import { UploadedFiles } from "../../../types";

const insertMusic = async (req: Request, res: Response) => {
  try {
    const { title, artist, genre, duration } = req.body;
    const files = req.files as UploadedFiles;

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const result = await musicAdminService.insertMusic(
      title,
      duration,
      files,
      baseUrl,
      artist,
      genre
    );

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro inesperado ao inserir música: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro interno do servidor ao inserir música",
    });
  }
};

export default insertMusic;
