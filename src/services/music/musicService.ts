import { Op } from "sequelize";
import Music from "../../models/musicModel";
import { MusicDataResult } from "../../types/music/musicInterface";

export interface MusicService {
  getAllMusic(): Promise<Music[]>;
  getMusicData(id: number): Promise<MusicDataResult>;
  searchMusics(query: string): Promise<Music[]>;
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

  async searchMusics(query: string, limit?: number): Promise<Music[]> {
    try {
      if (!query || query.trim() === "") {
        throw new Error("Query inválida");
      }

      const searchTerms = query
        .trim()
        .split(/\s+/)
        .filter((term) => term.length > 0);

      if (searchTerms.length === 0) {
        throw new Error("Nenhum termo de pesquisa válido encontrado");
      }

      const whereClause = {
        [Op.or]: [
          ...searchTerms.map((term) => ({
            title: { [Op.iLike]: `%${term}%` },
          })),
          ...searchTerms.map((term) => ({
            artist: { [Op.iLike]: `%${term}%` },
          })),
          ...searchTerms.map((term) => ({
            genre: { [Op.iLike]: `%${term}%` },
          })),
        ],
      };

      const musics = await Music.findAll({
        where: whereClause,
        limit: limit ?? 5,
        order: [["title", "ASC"]],
        attributes: ["id", "title", "artist", "imageUrl", "duration"],
      });

      return musics;
    } catch (error) {
      throw error;
    }
  }
}

export default new MusicServiceImpl();
