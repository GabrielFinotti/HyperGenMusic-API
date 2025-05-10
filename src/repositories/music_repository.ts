import { Op } from "sequelize";
import { Music } from "../models";
import { IMusicRepository, MusicAttributes, MusicData } from "../types";

class MusicRepository implements IMusicRepository {
  async getAllMusic() {
    try {
      const musics = await Music.findAll();

      return musics.length > 0 ? musics : null;
    } catch (error) {
      throw error;
    }
  }

  async getMusicById(musicId: number) {
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

  async createMusic(music: Partial<MusicAttributes>) {
    try {
      const newMusic = await Music.create(music as MusicAttributes);

      return newMusic;
    } catch (error) {
      throw error;
    }
  }

  async updateMusic(musicId: number, data: Partial<MusicAttributes>) {
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

  async deleteMusic(musicId: number) {
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

export default new MusicRepository();
