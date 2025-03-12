import { Request, Response } from "express";
import { MusicInterface } from "../../interfaces/musicInterface";

export const insertMusic = async (req: Request, res: Response) => {
  try {
    const music = req.body as MusicInterface
    
  } catch (error) {
    console.error(`Erro durante a inserção da música: ${error}`.red.bgBlack);
    res.status(500).send({ message: "Erro durante a inserção da música" });
  }
};
