import { Op } from "sequelize";
import { Music } from "../models";
import { IMusicRepository } from "../types";

class MusicRepository implements IMusicRepository {
  async getAllMusic() {
    try {
      const musics = await Music.findAll();

      return musics.length > 0 ? musics : null;
    } catch (error) {
      throw error;
    }
  }

  async getMusicById(musicId: string) {
    try {
      const music = await Music.findByPk(musicId);

      return music ?? null;
    } catch (error) {
      throw error;
    }
  }

  async getMusicByTerm(term: string) {
    try {
      const whereClause = {
        [Op.or]: [
          { title: { [Op.like]: `%${term}%` } },
          { artist: { [Op.like]: `%${term}%` } },
          { genre: { [Op.like]: `%${term}%` } },
        ],
      };

      const musics = await Music.findAll({ where: whereClause });

      return musics.length > 0 ? musics : null;
    } catch (error) {
      throw error;
    }
  }

  async createMusic(music: any) {
    try {
      const newMusic = await Music.create(music);

      return newMusic;
    } catch (error) {
      throw error;
    }
  }

  async updateMusic(musicId: string, data: any) {
    try {
      const transaction = await Music.sequelize?.transaction();
      const music = (await Music.findByPk(musicId)) as Music;

      try {
        await music.update(data, { transaction });

        await transaction?.commit();

        return music;
      } catch (error) {
        await transaction?.rollback();

        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteMusic(musicId: string) {
    try {
      const result = await Music.destroy({
        where: { id: musicId },
      });

      return result > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default MusicRepository;
