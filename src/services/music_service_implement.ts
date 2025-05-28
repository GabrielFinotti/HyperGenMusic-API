/**
 * Serviço de Música - HyperMusic API v2.0
 *
 * Implementa toda a lógica de negócio para operações relacionadas ao catálogo
 * de músicas, incluindo listagem, busca por termo/gênero e recuperação de dados.
 *
 * Funcionalidades:
 * - Listagem paginada do catálogo completo
 * - Busca por termo (título, artista, álbum)
 * - Filtros por gênero musical
 * - Recuperação de dados específicos por ID
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { MusicRepository } from "../repositories";
import { IMusicRepository, MusicService } from "../types";
import { responseUtils } from "../utils";

/**
 * Implementação do serviço de músicas
 *
 * Gerencia toda a lógica de negócio para consultas e operações
 * de leitura do catálogo musical da aplicação.
 *
 * @class MusicServiceImpl
 * @implements {MusicService}
 */
class MusicServiceImpl implements MusicService {
  /**
   * Injeta dependência do repositório de músicas
   * @param musicRepository - Repository para operações de música
   */
  constructor(private musicRepository: IMusicRepository = MusicRepository) {}

  /**
   * Recupera todas as músicas do catálogo com paginação
   * @param limit - Número máximo de músicas por página
   * @param offset - Número de músicas a pular (para paginação)
   * @returns Lista paginada de músicas ou erro
   */
  async getAllMusics(limit: number, offset: number) {
    try {
      const musics = await this.musicRepository.getAllMusics(limit, offset);

      if (!musics) {
        return responseUtils.createErrorResponse("No music found.", 404);
      }

      return responseUtils.createSuccessResponse(
        "All music fetched successfully.",
        musics,
        200
      );
    } catch (error) {
      console.error("Error fetching all music:", error);

      return responseUtils.createErrorResponse(
        "An error occurred while fetching all music.",
        500
      );
    }
  }

  /**
   * Busca músicas por termo de pesquisa
   * Pesquisa em título, artista e álbum
   * @param term - Termo de busca
   * @param limit - Número máximo de resultados
   * @param offset - Número de resultados a pular
   * @returns Músicas que correspondem ao termo ou erro
   */
  async getMusicByTerm(term: string, limit: number, offset: number) {
    try {
      const musics = await this.musicRepository.getMusicByTerm(
        term,
        limit,
        offset
      );

      if (!musics) {
        return responseUtils.createErrorResponse(
          "No music found matching the term.",
          404
        );
      }

      return responseUtils.createSuccessResponse(
        "Music fetched successfully by term.",
        musics,
        200
      );
    } catch (error) {
      console.error("Error fetching music by term:", error);

      return responseUtils.createErrorResponse(
        "An error occurred while fetching music by term.",
        500
      );
    }
  }

  /**
   * Filtra músicas por gênero musical
   * @param genre - Gênero musical para filtrar
   * @param limit - Número máximo de resultados
   * @param offset - Número de resultados a pular
   * @returns Músicas do gênero especificado ou erro
   */
  async getMusicByGenre(genre: string, limit: number, offset: number) {
    try {
      const musics = await this.musicRepository.getMusicByGenre(
        genre,
        limit,
        offset
      );

      if (!musics) {
        return responseUtils.createErrorResponse(
          "No music found for the specified genre.",
          404
        );
      }

      return responseUtils.createSuccessResponse(
        "Music fetched successfully by genre.",
        musics,
        200
      );
    } catch (error) {
      console.error("Error fetching music by genre:", error);

      return responseUtils.createErrorResponse(
        "An error occurred while fetching music by genre.",
        500
      );
    }
  }

  /**
   * Recupera dados completos de uma música específica
   * @param musicId - ID único da música
   * @returns Dados completos da música ou erro se não encontrada
   */
  async getMusicData(musicId: number) {
    try {
      const music = await this.musicRepository.getMusicById(musicId);

      if (!music) {
        return responseUtils.createErrorResponse("No music found.", 404);
      }

      return responseUtils.createSuccessResponse(
        "Music fetched successfully.",
        music,
        200
      );
    } catch (error) {
      console.error("Error fetching music data:", error);

      return responseUtils.createErrorResponse(
        "An error occurred while fetching music data.",
        500
      );
    }
  }
}

export default new MusicServiceImpl();
