/**
 * Implementação do Serviço de Músicas Curtidas - HyperMusic API v2.0
 *
 * Implementa toda a lógica de negócio para operações relacionadas ao
 * sistema de curtidas/favoritos, incluindo validações e controle
 * de associações entre usuários e suas músicas favoritas.
 *
 * Funcionalidades implementadas:
 * - Sistema completo de curtidas funcionalmente operacional
 * - Validações de duplicatas e integridade de dados
 * - Consultas otimizadas de músicas favoritas
 * - Controle robusto de associações usuário-música
 * - Tratamento de erros padronizado
 * - Integração completa com repositório de dados
 * - 4 métodos completamente funcionais
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { LikedMusicRepository } from "../repositories";
import {
  ILikedMusicRepository,
  LikedMusicData,
  LikedMusicService,
} from "../types";
import { responseUtils } from "../utils";

/**
 * Implementação do serviço de músicas curtidas
 *
 * Gerencia toda a lógica de negócio para o sistema de curtidas,
 * incluindo validações, controle de duplicatas e orquestração.
 * Implementa completamente a interface LikedMusicService com 4 métodos:
 * - getLikedMusicsByUserId: Recupera músicas curtidas por usuário
 * - checkIfUserLikedMusic: Verifica status de curtida
 * - likeMusic: Adiciona música aos favoritos
 * - unlikeMusic: Remove música dos favoritos
 *
 * @class LikedMusicServiceImpl
 * @implements {LikedMusicService}
 */
class LikedMusicServiceImpl implements LikedMusicService {
  /**
   * Injeta dependência do repositório de músicas curtidas
   * @param likedMusicRepository - Repository para operações de curtidas
   */
  constructor(
    private likedMusicRepository: ILikedMusicRepository = LikedMusicRepository
  ) {}
  /**
   * Recupera todas as músicas curtidas por um usuário específico
   *
   * Valida o ID do usuário e retorna todas as músicas que foram
   * marcadas como favoritas pelo usuário. Inclui validação de entrada
   * e tratamento robusto de erros.
   *
   * @param {number} userId - ID único do usuário
   * @returns {Promise<ResponseSuccess<any[]> | ResponseError>} Promise com lista de músicas curtidas ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const result = await likedMusicService.getLikedMusicsByUserId(123);
   * if (result.success) {
   *   console.log('Músicas curtidas:', result.data);
   * }
   * ```
   */
  async getLikedMusicsByUserId(userId: number) {
    try {
      if (isNaN(userId)) {
        return responseUtils.createErrorResponse("Invalid user ID", 400);
      }

      const likedMusics =
        await this.likedMusicRepository.getLikedMusicsByUserId(userId);

      if (!likedMusics) {
        return responseUtils.createErrorResponse(
          "No liked musics found for this user",
          404
        );
      }

      return responseUtils.createSuccessResponse(
        "Liked musics retrieved successfully",
        likedMusics,
        200
      );
    } catch (error) {
      console.error("Error retrieving liked musics by user ID:", error);

      return responseUtils.createErrorResponse(
        "Failed to retrieve liked musics",
        500
      );
    }
  }
  /**
   * Verifica se um usuário curtiu uma música específica
   *
   * Consulta o repositório para determinar se existe uma associação
   * de curtida entre o usuário e a música informados. Retorna status
   * booleano da curtida.
   *
   * @param {LikedMusicData} likedMusicData - Dados da associação usuário-música
   * @param {number} likedMusicData.userId - ID do usuário
   * @param {number} likedMusicData.musicId - ID da música
   * @returns {Promise<ResponseSuccess<boolean> | ResponseError>} Promise com status da curtida ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const checkData = { userId: 123, musicId: 456 };
   * const result = await likedMusicService.checkIfUserLikedMusic(checkData);
   * if (result.success) {
   *   console.log('Usuário curtiu a música:', result.data);
   * }
   * ```
   */
  async checkIfUserLikedMusic(likedMusicData: LikedMusicData) {
    try {
      const isLiked = await this.likedMusicRepository.checkIfUserLikedMusic(
        likedMusicData
      );

      return responseUtils.createSuccessResponse(
        "Check if user liked music",
        isLiked,
        200
      );
    } catch (error) {
      console.error("Error checking if user liked music:", error);

      return responseUtils.createErrorResponse(
        "Failed to check if user liked music",
        500
      );
    }
  }
  /**
   * Adiciona uma música aos favoritos do usuário
   *
   * Cria uma nova associação de curtida entre usuário e música.
   * O repositório é responsável por validar duplicatas e garantir
   * a integridade dos dados da associação.
   *
   * @param {LikedMusicData} likedMusicData - Dados da nova curtida
   * @param {number} likedMusicData.userId - ID do usuário que está curtindo
   * @param {number} likedMusicData.musicId - ID da música a ser curtida
   * @returns {Promise<ResponseSuccess<boolean> | ResponseError>} Promise com sucesso da operação ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const likeData = { userId: 123, musicId: 456 };
   * const result = await likedMusicService.likeMusic(likeData);
   * if (result.success) {
   *   console.log('Música curtida com sucesso!');
   * }
   * ```
   */
  async likeMusic(likedMusicData: LikedMusicData) {
    try {
      const result = await this.likedMusicRepository.likeMusic(likedMusicData);

      return responseUtils.createSuccessResponse(
        "Music liked successfully",
        result !== null,
        200
      );
    } catch (error) {
      console.error("Error liking music:", error);

      return responseUtils.createErrorResponse("Failed to like music", 500);
    }
  }
  /**
   * Remove uma música dos favoritos do usuário
   *
   * Remove a associação de curtida entre usuário e música.
   * A operação é idempotente, não gerando erro se a associação
   * não existir previamente.
   *
   * @param {LikedMusicData} likedMusicData - Dados da curtida a ser removida
   * @param {number} likedMusicData.userId - ID do usuário que está removendo a curtida
   * @param {number} likedMusicData.musicId - ID da música a ter curtida removida
   * @returns {Promise<ResponseSuccess<any> | ResponseError>} Promise com resultado da operação ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const unlikeData = { userId: 123, musicId: 456 };
   * const result = await likedMusicService.unlikeMusic(unlikeData);
   * if (result.success) {
   *   console.log('Curtida removida com sucesso!');
   * }
   * ```
   */
  async unlikeMusic(likedMusicData: LikedMusicData) {
    try {
      const result = await this.likedMusicRepository.unlikeMusic(
        likedMusicData
      );

      return responseUtils.createSuccessResponse(
        "Music unliked successfully",
        result,
        200
      );
    } catch (error) {
      console.error("Error unliking music:", error);

      return responseUtils.createErrorResponse("Failed to unlike music", 500);
    }
  }
}

export default new LikedMusicServiceImpl();
