import { Request, Response } from "express";
import { musicService } from "../../services";

export const getMusicById = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.id);
    
    // Validação já está no serviço, não precisamos duplicar aqui
    const music = await musicService.getMusicById(musicId);

    if (!music) {
      res.status(404).json({ error: "Música não encontrada" });
      return;
    }

    res.status(200).json(music.toApiFormat());
  } catch (error) {
    console.error(`Erro ao recuperar dados da música: ${error}`.red.bgBlack);
    
    if (error instanceof Error && error.message === "ID de música inválido") {
      res.status(400).json({ error: error.message });
      return;
    }
    
    res.status(500).json({ error: "Falha ao recuperar dados da música" });
  }
};
