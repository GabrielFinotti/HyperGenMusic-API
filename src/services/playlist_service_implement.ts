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

  async updateMusicPosition(
    playlistId: number,
    musicId: number,
    newPosition: number
  ) {
    try {
      if (isNaN(playlistId) || isNaN(musicId)) {
        return responseUtils.createErrorResponse(
          "Invalid playlist ID or music ID",
          400
        );
      }

      if (isNaN(newPosition) || newPosition < 1) {
        return responseUtils.createErrorResponse(
          "Invalid position. Position must be a positive number",
          400
        );
      }

      const updated = await this.playlistMusicRepository.updateMusicPosition(
        playlistId,
        musicId,
        newPosition
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

  async removeMusicFromPlaylist(playlistId: number, musicId: number) {
    try {
      if (isNaN(playlistId) || isNaN(musicId)) {
        return responseUtils.createErrorResponse(
          "Invalid playlist ID or music ID",
          400
        );
      }

      const removed =
        await this.playlistMusicRepository.removeMusicFromPlaylist(
          playlistId,
          musicId
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
