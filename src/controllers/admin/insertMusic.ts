import { Request, Response } from "express";

export const insertMusic = async (req: Request, res: Response) => {
  try {

  } catch (error) {
    console.error(`Erro durante a inserção da música: ${error}`.red.bgBlack);

    res.status(500).json({ message: "Erro durante o registro da música" });
  }
};
