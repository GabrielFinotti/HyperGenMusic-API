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
      .json(
        result.success
          ? { message: "Música editada com sucesso", music: result.music }
          : { error: result.error }
      );
  } catch (error) {
    console.error(`Erro inesperado ao editar música: ${error}`.red.bgBlack);

    res.status(500).json({ error: "Falha ao editar música no sistema" });
  }
};

export default editMusic;
