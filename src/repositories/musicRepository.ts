import { Op } from "sequelize";
import Music from "../models/musicModel";
import { IMusicRepository, MusicInterface } from "../types";

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
}

export default new MusicRepository();
