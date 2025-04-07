import { Op } from "sequelize";
import Music from "../models/musicModel";
import { IMusicRepository, MusicInterface } from "../types";
import sequelize from "../config/database/databaseConfig";

class MusicRepository implements IMusicRepository {
  constructor(private musicModel = Music) {}

  async findById(musicId: number) {
    try {
      return await this.musicModel.findByPk(musicId);
    } catch (error) {
      console.error(
        `Erro ao buscar música por ID: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      throw new Error("Erro ao buscar música por ID.");
    }
  }

  async findByTerms(searchTerms: string[], limit = 10, offset = 0) {
    try {
      const whereCondition = {
        [Op.or]: [
          {
            title: {
              [Op.or]: searchTerms.map((term) => ({ [Op.like]: `%${term}%` })),
            },
          },
          {
            artist: {
              [Op.or]: searchTerms.map((term) => ({ [Op.like]: `%${term}%` })),
            },
          },
          {
            genre: {
              [Op.or]: searchTerms.map((term) => ({ [Op.like]: `%${term}%` })),
            },
          },
        ],
      };

      return this.musicModel.findAll({
        where: whereCondition,
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      console.error(
        `Erro ao buscar música por termos: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      throw new Error("Erro ao buscar música por termos.");
    }
  }

  async findAll(limit = 10, offset = 0) {
    try {
      return await this.musicModel.findAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      console.error(
        `Erro ao buscar todas as músicas: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      throw new Error("Erro ao buscar todas as músicas.");
    }
  }

  async create(musicData: MusicInterface) {
    try {
      return await this.musicModel.create(musicData);
    } catch (error) {
      console.error(
        `Erro ao criar música: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      throw new Error("Erro ao criar música.");
    }
  }

  async update(music: Music, musicData: Partial<MusicInterface>) {
    const transaction = await sequelize.transaction();

    try {
      await music.update(
        {
          title: musicData.title?.trim() ?? music.title,
          artist: musicData.artist?.trim() ?? music.artist,
          genre: musicData.genre?.trim() ?? music.genre,
          imageUrl: musicData.imageUrl ?? music.imageUrl,
        },
        { transaction }
      );

      await transaction.commit();

      return music;
    } catch (error) {
      console.error(
        `Erro ao atualizar música: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      await transaction.rollback();

      throw new Error("Erro ao atualizar música.");
    }
  }

  async delete(music: Music) {
    try {
      await music.destroy();

      return true;
    } catch (error) {
      console.error(
        `Erro ao deletar música: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      throw new Error("Erro ao deletar música.");
    }
  }

  async deleteAll() {
    const transaction = await sequelize.transaction();

    try {
      const result = await this.musicModel.destroy({
        where: {},
        truncate: true,
        transaction,
      });

      await transaction.commit();

      return result;
    } catch (error) {
      console.error(
        `Erro ao deletar todas as músicas: ${
          error instanceof Error ? error.message : String(error)
        }`
      );

      await transaction.rollback();

      throw new Error("Erro ao deletar todas as músicas.");
    }
  }
}

export default new MusicRepository();
