/**
 * Implementação do Serviço de Playlists - HyperMusic API v2.0
 *
 * Implementa toda a lógica de negócio para operações relacionadas ao
 * gerenciamento de playlists, incluindo CRUD completo de playlists
 * e controle de músicas com posicionamento.
 *
 * Funcionalidades implementadas:
 * - CRUD completo para playlists de usuários
 * - Gerenciamento de músicas em playlists com posicionamento
 * - Sistema de ordenação e reposicionamento
 * - Validações robustas de negócio e segurança
 * - Tratamento de erros centralizado
 * - Integração com repositórios de dados
 * - 8 métodos completamente funcionais
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { PlaylistRepository, PlaylistMusicRepository } from "../repositories";
import {
  IPlaylistRepository,
  IPlaylistMusicRepository,
  PlaylistService,
  PlaylistData,
  PlaylistMusicData,
} from "../types";
import { responseUtils } from "../utils";

/**
 * Implementação do serviço de playlists
 *
 * Gerencia toda a lógica de negócio para operações de playlists,
 * incluindo validações, transformações e orquestração de dados.
 * Implementa completamente a interface PlaylistService com 8 métodos:
 * - CRUD de playlists (getPlaylistByUserId, createPlaylist, updatePlaylist, deletePlaylist)
 * - Gerenciamento de músicas (getMusicsByPlaylistId, addMusicToPlaylist, updateMusicPosition, removeMusicFromPlaylist)
 *
 * @class PlaylistServiceImpl
 * @implements {PlaylistService}
 */
class PlaylistServiceImpl implements PlaylistService {
  /**
   * Injeta dependências dos repositórios necessários
   * @param playlistRepository - Repository para operações de playlist
   * @param playlistMusicRepository - Repository para operações de música em playlist
   */
  constructor(
    private playlistRepository: IPlaylistRepository = PlaylistRepository,
    private playlistMusicRepository: IPlaylistMusicRepository = PlaylistMusicRepository
  ) {}
  /**
   * Recupera todas as playlists pertencentes a um usuário específico
   *
   * Valida o ID do usuário e retorna todas as playlists criadas
   * por ele. Inclui validação de entrada e tratamento de casos
   * onde o usuário não possui playlists.
   *
   * @param {number} userId - ID único do usuário
   * @returns {Promise<ResponseSuccess<any[]> | ResponseError>} Promise com lista de playlists ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const result = await playlistService.getPlaylistByUserId(123);
   * if (result.success) {
   *   console.log('Playlists do usuário:', result.data);
   * }
   * ```
   */
  async getPlaylistByUserId(userId: number) {
    try {
      if (isNaN(userId)) {
        return responseUtils.createErrorResponse("Invalid user ID", 400);
      }

      const playlists = await this.playlistRepository.getPlaylistsByUserId(
        userId
      );

      if (playlists.length === 0) {
        return responseUtils.createErrorResponse(
          "No playlists found for this user",
          404
        );
      }

      return responseUtils.createSuccessResponse(
        "Playlists retrieved successfully",
        playlists,
        200
      );
    } catch (error) {
      console.error("Error fetching playlists by user ID:", error);

      return responseUtils.createErrorResponse(
        "Failed to fetch playlists",
        500
      );
    }
  }

  /**
   * Cria uma nova playlist para um usuário
   *
   * Valida os dados de entrada e cria uma nova playlist no sistema.
   * Inclui validações de ID do usuário e nome da playlist para
   * garantir a integridade dos dados.
   *
   * @param {PlaylistData} playlistData - Dados da nova playlist
   * @param {number} playlistData.userId - ID do usuário proprietário
   * @param {string} playlistData.name - Nome da playlist (obrigatório e não vazio)
   * @param {string} [playlistData.description] - Descrição opcional da playlist
   * @returns {Promise<ResponseSuccess<any> | ResponseError>} Promise com dados da playlist criada ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const playlistData = {
   *   userId: 123,
   *   name: "Minha Playlist",
   *   description: "Músicas favoritas"
   * };
   * const result = await playlistService.createPlaylist(playlistData);
   * if (result.success) {
   *   console.log('Playlist criada:', result.data);
   * }
   * ```
   */
  async createPlaylist(playlistData: PlaylistData) {
    try {
      if (isNaN(playlistData.userId)) {
        return responseUtils.createErrorResponse("Invalid user ID", 400);
      }

      if (playlistData.name !== playlistData.name.trim()) {
        return responseUtils.createErrorResponse(
          "Playlist name cannot be empty",
          400
        );
      }

      const newPlaylist = await this.playlistRepository.createPlaylist(
        playlistData
      );

      return responseUtils.createSuccessResponse(
        "Playlist created successfully",
        newPlaylist,
        201
      );
    } catch (error) {
      console.error("Error creating playlist:", error);

      return responseUtils.createErrorResponse(
        "Failed to create playlist",
        500
      );
    }
  }

  /**
   * Atualiza dados de uma playlist existente
   *
   * Permite atualização parcial dos dados da playlist, incluindo
   * validações de entrada. Retorna os dados atualizados da playlist
   * após a operação bem-sucedida.
   *
   * @param {number} playlistId - ID único da playlist a ser atualizada
   * @param {Partial<PlaylistData>} playlistData - Dados parciais para atualização
   * @param {string} [playlistData.name] - Novo nome da playlist (se fornecido, não pode ser vazio)
   * @param {string} [playlistData.description] - Nova descrição da playlist
   * @returns {Promise<ResponseSuccess<any> | ResponseError>} Promise com dados atualizados ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const updateData = { name: "Novo Nome", description: "Nova descrição" };
   * const result = await playlistService.updatePlaylist(456, updateData);
   * if (result.success) {
   *   console.log('Playlist atualizada:', result.data);
   * }
   * ```
   */
  async updatePlaylist(
    playlistId: number,
    playlistData: Partial<PlaylistData>
  ) {
    try {
      if (isNaN(playlistId)) {
        return responseUtils.createErrorResponse("Invalid playlist ID", 400);
      }

      if (playlistData.name && playlistData.name.trim() === "") {
        return responseUtils.createErrorResponse(
          "Playlist name cannot be empty",
          400
        );
      }

      await this.playlistRepository.updatePlaylist(playlistId, playlistData);

      const updatedPlaylist = await this.playlistRepository.getPlaylistById(
        playlistId
      );

      return responseUtils.createSuccessResponse(
        "Playlist updated successfully",
        updatedPlaylist,
        200
      );
    } catch (error) {
      console.error("Error updating playlist:", error);

      return responseUtils.createErrorResponse(
        "Failed to update playlist",
        500
      );
    }
  }

  /**
   * Remove uma playlist do sistema
   *
   * Exclui permanentemente uma playlist e todas as suas associações
   * de músicas. A operação inclui validação do ID e verificação
   * da existência da playlist antes da exclusão.
   *
   * @param {number} playlistId - ID único da playlist a ser removida
   * @returns {Promise<ResponseSuccess<boolean> | ResponseError>} Promise com sucesso da operação ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const result = await playlistService.deletePlaylist(456);
   * if (result.success) {
   *   console.log('Playlist removida com sucesso!');
   * }
   * ```
   */
  async deletePlaylist(playlistId: number) {
    try {
      if (isNaN(playlistId)) {
        return responseUtils.createErrorResponse("Invalid playlist ID", 400);
      }

      const deleted = await this.playlistRepository.deletePlaylist(playlistId);

      if (!deleted) {
        return responseUtils.createErrorResponse(
          "Playlist not found or already deleted",
          404
        );
      }

      return responseUtils.createSuccessResponse(
        "Playlist deleted successfully",
        true,
        200
      );
    } catch (error) {
      console.error("Error deleting playlist:", error);

      return responseUtils.createErrorResponse(
        "Failed to delete playlist",
        500
      );
    }
  }

  /**
   * Recupera todas as músicas de uma playlist específica
   *
   * Retorna a lista ordenada de músicas contidas em uma playlist,
   * incluindo informações de posicionamento. Valida o ID da playlist
   * e trata casos onde a playlist está vazia.
   *
   * @param {number} playlistId - ID único da playlist
   * @returns {Promise<ResponseSuccess<any[]> | ResponseError>} Promise com lista de músicas ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const result = await playlistService.getMusicsByPlaylistId(456);
   * if (result.success) {
   *   console.log('Músicas da playlist:', result.data);
   * }
   * ```
   */
  async getMusicsByPlaylistId(playlistId: number) {
    try {
      if (isNaN(playlistId)) {
        return responseUtils.createErrorResponse("Invalid playlist ID", 400);
      }

      const playlistMusics =
        await this.playlistMusicRepository.getMusicsByPlaylistId(playlistId);

      if (playlistMusics.length === 0) {
        return responseUtils.createErrorResponse(
          "No musics found in this playlist",
          404
        );
      }

      return responseUtils.createSuccessResponse(
        "Playlist musics retrieved successfully",
        playlistMusics,
        200
      );
    } catch (error) {
      console.error("Error retrieving playlist musics:", error);

      return responseUtils.createErrorResponse(
        "Failed to retrieve playlist musics",
        500
      );
    }
  }

  /**
   * Adiciona uma música a uma playlist em posição específica
   *
   * Insere uma música na playlist na posição especificada,
   * reorganizando automaticamente as posições das outras músicas
   * conforme necessário. Inclui validações completas de entrada.
   *
   * @param {PlaylistMusicData} playlistMusicData - Dados da música a ser adicionada
   * @param {number} playlistMusicData.playlistId - ID da playlist de destino
   * @param {number} playlistMusicData.musicId - ID da música a ser adicionada
   * @param {number} playlistMusicData.position - Posição desejada (deve ser >= 1)
   * @returns {Promise<ResponseSuccess<any> | ResponseError>} Promise com dados da associação criada ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const musicData = { playlistId: 123, musicId: 456, position: 1 };
   * const result = await playlistService.addMusicToPlaylist(musicData);
   * if (result.success) {
   *   console.log('Música adicionada:', result.data);
   * }
   * ```
   */
  async addMusicToPlaylist(playlistMusicData: PlaylistMusicData) {
    try {
      if (
        isNaN(playlistMusicData.playlistId) ||
        isNaN(playlistMusicData.musicId)
      ) {
        return responseUtils.createErrorResponse(
          "Invalid playlist ID or music ID",
          400
        );
      }

      if (isNaN(playlistMusicData.position) || playlistMusicData.position < 1) {
        return responseUtils.createErrorResponse(
          "Invalid position. Position must be a positive number",
          400
        );
      }

      const newPlaylistMusic =
        await this.playlistMusicRepository.addMusicToPlaylist(
          playlistMusicData
        );

      return responseUtils.createSuccessResponse(
        "Music added to playlist successfully",
        newPlaylistMusic,
        201
      );
    } catch (error) {
      console.error("Error adding music to playlist:", error);

      return responseUtils.createErrorResponse(
        "Failed to add music to playlist",
        500
      );
    }
  }

  /**
   * Atualiza a posição de uma música dentro da playlist
   *
   * Move uma música existente para uma nova posição na playlist,
   * reorganizando automaticamente as posições das demais músicas.
   * Inclui validações de IDs e posição de destino.
   *
   * @param {number} playlistId - ID da playlist onde a música está
   * @param {number} musicId - ID da música a ter posição alterada
   * @param {number} newPosition - Nova posição desejada (deve ser >= 1)
   * @returns {Promise<ResponseSuccess<boolean> | ResponseError>} Promise com sucesso da operação ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const result = await playlistService.updateMusicPosition(123, 456, 3);
   * if (result.success) {
   *   console.log('Posição da música atualizada!');
   * }
   * ```
   */
  async updateMusicPosition(playlistMusicData: PlaylistMusicData) {
    try {
      if (
        isNaN(playlistMusicData.playlistId) ||
        isNaN(playlistMusicData.musicId)
      ) {
        return responseUtils.createErrorResponse(
          "Invalid playlist ID or music ID",
          400
        );
      }

      if (isNaN(playlistMusicData.position) || playlistMusicData.position < 1) {
        return responseUtils.createErrorResponse(
          "Invalid position. Position must be a positive number",
          400
        );
      }

      const updated = await this.playlistMusicRepository.updateMusicPosition(
        playlistMusicData
      );

      if (!updated) {
        return responseUtils.createErrorResponse(
          "Music not found in playlist or position not updated",
          404
        );
      }

      return responseUtils.createSuccessResponse(
        "Music position updated successfully",
        true,
        200
      );
    } catch (error) {
      console.error("Error updating music position:", error);

      return responseUtils.createErrorResponse(
        "Failed to update music position",
        500
      );
    }
  }
  
  /**
   * Remove uma música de uma playlist
   *
   * Exclui permanentemente a associação entre música e playlist,
   * reorganizando automaticamente as posições das músicas restantes.
   * A operação inclui validações de IDs e verificação de existência.
   *
   * @param {number} playlistId - ID da playlist de origem
   * @param {number} musicId - ID da música a ser removida
   * @returns {Promise<ResponseSuccess<boolean> | ResponseError>} Promise com sucesso da operação ou erro
   * @throws {Error} Quando há falha na comunicação com o repositório
   *
   * @example
   * ```typescript
   * const result = await playlistService.removeMusicFromPlaylist(123, 456);
   * if (result.success) {
   *   console.log('Música removida da playlist!');
   * }
   * ```
   */
  async removeMusicFromPlaylist(playlistMusicData: PlaylistMusicData) {
    try {
      if (
        isNaN(playlistMusicData.playlistId) ||
        isNaN(playlistMusicData.musicId)
      ) {
        return responseUtils.createErrorResponse(
          "Invalid playlist ID or music ID",
          400
        );
      }

      const removed =
        await this.playlistMusicRepository.removeMusicFromPlaylist(
          playlistMusicData
        );

      if (!removed) {
        return responseUtils.createErrorResponse(
          "Music not found in playlist or already removed",
          404
        );
      }

      return responseUtils.createSuccessResponse(
        "Music removed from playlist successfully",
        true,
        200
      );
    } catch (error) {
      console.error("Error removing music from playlist:", error);

      return responseUtils.createErrorResponse(
        "Failed to remove music from playlist",
        500
      );
    }
  }
}

export default new PlaylistServiceImpl();
