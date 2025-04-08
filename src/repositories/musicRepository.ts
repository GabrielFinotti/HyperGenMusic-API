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
      throw new Error("Erro ao buscar todas as músicas.");
    }
  }

  async create(musicData: MusicInterface) {
    try {
      return await this.musicModel.create(musicData);
    } catch (error) {
      throw new Error("Erro ao criar música.");
    }
  }

  async update(music: Music, musicData: Partial<MusicInterface>) {
    const transaction = await sequelize.transaction();

    try {
      let hasChanges = false;

      (Object.keys(musicData) as Array<keyof MusicInterface>).forEach((key) => {
        const newValue = musicData[key];
        const currentValue = music.get(key);

        if (newValue !== undefined && newValue !== currentValue) {
          music.set(key, newValue);

          hasChanges = true;
        }
      });

      if (!hasChanges) {
        await transaction.rollback();

        return "Tudo está como antes, nada para atualizar";
      }

      await music.save({ transaction });

      await transaction.commit();

      return music;
    } catch (error) {
      await transaction.rollback();

      throw new Error("Erro ao atualizar música.");
    }
  }

  async delete(music: Music) {
    try {
      await music.destroy();

      return true;
    } catch (error) {
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
      await transaction.rollback();

      throw new Error("Erro ao deletar todas as músicas.");
    }
  }
}

export default new MusicRepository();
