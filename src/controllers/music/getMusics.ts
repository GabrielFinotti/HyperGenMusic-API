import { Request, Response } from "express";
import Music from "../../models/musicModel";

export const getMusics = async (req: Request, res: Response) => {
  try {
    const musics = await Music.findAll();

    return res.status(200).json(musics);
  } catch (error) {
    console.error(`Error retrieving musics: ${error}`.red.bgBlack);

    return res.status(500).send({ message: `Error retrieving musics!` });
  }
};
