import { Op } from "sequelize";
import Music from "../../models/musicModel";
import { DefaultResponseResult } from "../../types/handling/defaultReponse";
import { handlingUtils } from "../../utils";

export interface MusicService {
  getAllMusic(): Promise<DefaultResponseResult>;
  getMusicData(id: number): Promise<DefaultResponseResult>;
  searchMusics(query: string): Promise<DefaultResponseResult>;
}

class MusicServiceImpl implements MusicService {
  async getAllMusic() {
    try {
      const musics = await Music.findAll({
        limit: 10,
        order: [["createdAt", "DESC"]],
        attributes: ["id", "title", "artist", "imageUrl", "duration"],
      });

      if (!musics) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Nenhuma música encontrada!"
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        "Musicas recuperadas com sucesso",
        musics
      );
    } catch (error) {
      console.error(
        `Erro ao recuperar músicas: ${
          error instanceof Error ? error.message : String(error)
        }!`
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro ao tentar recuperar as músicas. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async getMusicData(musicId: number) {
    try {
      if (isNaN(musicId)) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "ID de música inválido!"
        );
      }

      const music = await Music.findByPk(musicId);

      if (!music) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Música não encontrada!"
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        "Dados da música recuperados com sucesso!",
        music.toApiFormat()
      );
    } catch (error) {
      console.error(
        `Erro ao recuperar dados da música: ${
          error instanceof Error ? error.message : String(error)
        }!`
      );

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro ao tentar recuperar os dados da música. Por favor, tente novamente mais tarde!"
      );
    }
  }

  async searchMusics(query: string, limit?: number) {
    try {
      if (!query || query.trim() === "") {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Nenhum termo de pesquisa foi fornecido!"
        );
      }

      if (limit && (isNaN(limit) || limit <= 0)) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "O limite deve ser um número maior que 0!"
        );
      }

      const searchTerms = query
        .trim()
        .split(/\s+/)
        .filter((term) => term.length > 0);

      if (searchTerms.length === 0) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Nenhum termo de pesquisa válido foi encontrado!"
        );
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
        attributes: ["id", "title", "artist", "imageUrl"],
      });

      if (!musics) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          404,
          "Nenhuma música encontrada!"
        );
      }

      return handlingUtils.responseHandling.defaultResponseImpl(
        true,
        200,
        `${musics.length} músicas encontradas!`,
        musics
      );
    } catch (error) {
      console.error(`Erro ao buscar músicas: ${error}`.red.bgBlack);
    }

    return handlingUtils.responseHandling.defaultResponseImpl(
      false,
      500,
      "O servidor encontrou um erro inesperado ao buscar as músicas. Por favor, tente novamente mais tarde!"
    );
  }
}

export default new MusicServiceImpl();
