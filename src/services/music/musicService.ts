import { DefaultResponseResult, IMusicRepository } from "../../types";
import { handlingUtils } from "../../utils";
import { musicRepository } from "../../repositories";

export interface MusicService {
  getAllMusic(limit?: number, offset?: number): Promise<DefaultResponseResult>;
  getMusicData(id: number): Promise<DefaultResponseResult>;
  searchMusics(
    query: string,
    limit?: number,
    offset?: number
  ): Promise<DefaultResponseResult>;
}

class MusicServiceImpl implements MusicService {
  constructor(private repository: IMusicRepository = musicRepository) {}

  async getAllMusic(limit?: number, offset?: number) {
    try {
      
      if (limit !== undefined && limit < 0) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "O valor limite deve ser um número não negativo!"
        );
      }

      if (offset !== undefined && offset < 0) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "O valor de deslocamento deve ser um número não negativo!"
        );
      }

      const musics = await this.repository.findAll(limit, offset);

      if (!musics || musics.length === 0) {
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
        musics.map((music) => music.toApiFormat())
      );
    } catch (error) {
      console.error(
        `Erro ao recuperar músicas: ${
          error instanceof Error ? error.message : String(error)
        }`.red.bgBlack
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

      const music = await this.repository.findById(musicId);

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

  async searchMusics(query: string, limit?: number, offset?: number) {
    try {
      if (!query || query.trim() === "") {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "Nenhum termo de pesquisa foi fornecido!"
        );
      }

      if ((limit && isNaN(limit)) || (offset && isNaN(offset))) {
        return handlingUtils.responseHandling.defaultResponseImpl(
          false,
          400,
          "O valor de limite ou deslocamento deve ser do tipo numérico!"
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

      const musics = await this.repository.findByTerms(
        searchTerms,
        limit,
        offset
      );

      if (!musics || musics.length === 0) {
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
        musics.map((music) => music.toApiFormat())
      );
    } catch (error) {
      console.error(`Erro ao buscar músicas: ${error}`.red.bgBlack);

      return handlingUtils.responseHandling.defaultResponseImpl(
        false,
        500,
        "O servidor encontrou um erro inesperado ao buscar as músicas. Por favor, tente novamente mais tarde!"
      );
    }
  }
}

export default new MusicServiceImpl();
