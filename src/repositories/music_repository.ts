import { Op } from "sequelize";
import { Music } from "../models";
import { IMusicRepository, MusicAttributes } from "../types";

class MusicRepository implements IMusicRepository {
  async getAllMusics(limit: number = 10, offset: number = 0) {
    try {
      const musics = await Music.findAll({
        limit,
        offset,
      });

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

  async getMusicByTerm(term: string, limit: number = 10, offset: number = 0) {
    try {
      const whereClause = {
        [Op.or]: [
          { title: { [Op.like]: `%${term}%` } },
          { artist: { [Op.like]: `%${term}%` } },
          { genre: { [Op.like]: `%${term}%` } },
        ],
      };

      const musics = await Music.findAll({
        where: whereClause,
        limit,
        offset,
      });

      return musics.length > 0 ? musics : null;
    } catch (error) {
      throw error;
    }
  }

  async getMusicByGenre(genre: string, limit: number = 10, offset: number = 0) {
    try {
      const musics = await Music.findAll({
        where: { genre },
        limit,
        offset,
      });

      return musics.length > 0 ? musics : null;
    } catch (error) {
      throw error;
    }
  }

  async createMusic(music: Partial<MusicAttributes>) {
    try {
      await Music.create(music as MusicAttributes);
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
      await Music.destroy({
        where: { id: musicId },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteAllMusic() {
    try {
      const transaction = await Music.sequelize?.transaction();

      try {
        const result = await Music.destroy({
          where: {},
          truncate: true,
          transaction,
        });

        await transaction?.commit();

        return result;
      } catch (error) {
        await transaction?.rollback();

        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new MusicRepository();
