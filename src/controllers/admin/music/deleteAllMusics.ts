import { Request, Response } from "express";
import { musicAdminService } from "../../../services";

const deleteAllMusics = async (req: Request, res: Response) => {
  try {
    await musicAdminService.deleteAllMusics();

    res.status(200).json({ message: "Músicas deletadas com sucesso" });
  } catch (error) {
    console.error(`Erro ao deletar músicas: ${error}`.red.bgBlack);

    res.status(500).json({
      message: "Falha ao deletar as músicas",
    });
  }
};

export default deleteAllMusics;
