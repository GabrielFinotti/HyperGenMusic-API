import Music from "../../models/musicModel";
import { MusicDataResult } from "../../types/music/musicInterface";

export interface MusicService {
  getAllMusic(): Promise<Music[]>;
  getMusicData(id: number): Promise<MusicDataResult>;
}

class MusicServiceImpl implements MusicService {
  async getAllMusic() {
    try {
      const musics = await Music.findAll({
        limit: 10,
        order: [["createdAt", "DESC"]],
        attributes: ["id", "title", "artist", "imageUrl", "duration"],
      });

      return musics;
    } catch (error) {
      throw error;
    }
  }

  async getMusicData(musicId: number): Promise<MusicDataResult> {
    try {
      if (isNaN(musicId)) {
        throw new Error("ID de música inválido");
      }

      const music = await Music.findByPk(musicId);

      if (!music) {
        throw new Error("Música não encontrada");
      }

      return music.toApiFormat();
    } catch (error) {
      throw error;
    }
  }
}

export default new MusicServiceImpl();
