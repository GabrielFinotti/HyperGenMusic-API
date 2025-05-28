/**
 * Repositório de Músicas da Playlist - HyperMusic API v2.0
 *
 * Implementa o padrão Repository para operações de acesso a dados
 * relacionadas ao modelo PlaylistMusics. Gerencia o relacionamento
 * many-to-many entre playlists e músicas com posicionamento.
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { PlaylistMusics } from "../models";
import { IPlaylistMusicRepository } from "../types";
import { PlaylistMusicData } from "../types";

/**
 * Implementação do repositório de músicas de playlist
 *
 * Gerencia todas as operações de acesso a dados para o relacionamento
 * entre playlists e músicas, incluindo posicionamento e ordenação.
 *
 * @class PlaylistMusicRepository
 * @implements {IPlaylistMusicRepository}
 */
class PlaylistMusicRepository implements IPlaylistMusicRepository {
  /**
   * Recupera todas as músicas de uma playlist ordenadas por posição
   * @param playlistId - ID da playlist
   * @returns Array de músicas ordenadas por posição ascendente
   * @throws Erro do banco de dados
   */
  async getMusicsByPlaylistId(playlistId: number): Promise<PlaylistMusics[]> {
    try {
      const result = await PlaylistMusics.findAll({
        where: { playlistId },
        order: [["position", "ASC"]],
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Adiciona uma música a uma playlist específica
   * @param playlistMusicData - Dados da associação playlist-música (inclui posição)
   * @returns Registro de associação criado
   * @throws Erro de validação ou banco de dados
   */
  async addMusicToPlaylist(
    playlistMusicData: PlaylistMusicData
  ): Promise<PlaylistMusics> {
    try {
      const result = await PlaylistMusics.create(playlistMusicData);

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Atualiza a posição de uma música dentro da playlist
   * @param playlistId - ID da playlist
   * @param musicId - ID da música
   * @param newPosition - Nova posição da música na playlist
   * @returns true se atualizada com sucesso, false se não encontrada
   * @throws Erro do banco de dados
   */
  async updateMusicPosition(
    playlistId: number,
    musicId: number,
    newPosition: number
  ): Promise<boolean> {
    try {
      const result = await PlaylistMusics.update(
        { position: newPosition },
        { where: { playlistId, musicId } }
      );

      return result[0] > 0;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove uma música de uma playlist específica
   * @param playlistId - ID da playlist
   * @param musicId - ID da música a ser removida
   * @returns true se removida com sucesso, false se não encontrada
   * @throws Erro do banco de dados
   */
  async removeMusicFromPlaylist(
    playlistId: number,
    musicId: number
  ): Promise<boolean> {
    try {
      const result = await PlaylistMusics.destroy({
        where: { playlistId, musicId },
      });

      return result > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default new PlaylistMusicRepository();
