import { Request, Response } from "express";
import { musicAdminService } from "../../../services";

const deleteMusicById = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.musicId);

    await musicAdminService.deleteMusic(musicId);

    res.status(200).json({ message: "Música deletada com sucesso" });
  } catch (error) {
    console.error(`Erro inesperado ao deletar música: ${error}`.red.bgBlack);

    res.status(500).json({ error: "Falha ao deletar música no sistema" });
  }
};

export default deleteMusicById;
