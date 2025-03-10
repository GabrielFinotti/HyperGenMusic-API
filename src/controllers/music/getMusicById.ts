import { Request, Response } from "express";
import Music from "../../models/musicModel";

export const getMusicById = async (req: Request, res: Response) => {
  try {
    const musicId = parseInt(req.params.id);

    if (isNaN(musicId)) {
      return res.status(400).json({ error: "Invalid music ID" });
    }

    const music = await Music.findByPk(musicId);

    if (!music) {
      return res.status(404).json({ error: "Music not found" });
    }

    return res.status(200).json(music.toApiFormat());
  } catch (error) {
    console.error(`Error retrieving music data: ${error}`.red.bgBlack);

    return res.status(500).json({ error: "Failed to retrieve music data" });
  }
};
