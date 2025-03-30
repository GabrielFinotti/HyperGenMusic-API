import { Request, Response } from "express";
import { UploadedFiles } from "../../../types";
import { musicAdminService } from "../../../services";

const editMusic = async (req: Request, res: Response) => {
  try {
    const { title, artist, genre } = req.body;
    const files = req.files as UploadedFiles;
    const musicId = parseInt(req.params.musicId);

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const result = await musicAdminService.editMusic(
      musicId,
      baseUrl,
      title,
      artist,
      genre,
      files
    );

    res
      .status(result.statusCode)
      .json(Object.assign(result, { statusCode: undefined }));
  } catch (error) {
    console.error(
      `Erro inesperado ao editar música: ${
        error instanceof Error ? error.message : String(error)
      }`.red.bgBlack
    );

    res.status(500).json({
      isSuccess: false,
      message: "Erro interno do servidor ao editar música",
    });
  }
};

export default editMusic;
