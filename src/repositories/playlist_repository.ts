/**
 * Repositório de Playlist - HyperGenMusic API v2.0
 *
 * Implementa o padrão Repository para operações de acesso a dados
 * relacionadas ao modelo Playlist. Gerencia operações CRUD para
 * playlists dos usuários.
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Playlist } from "../models";
import { IPlaylistRepository } from "../types";
import { PlaylistData } from "../types";

/**
 * Implementação do repositório de playlists
 *
 * Gerencia todas as operações de acesso a dados para playlists,
 * incluindo criação, atualização, remoção e consultas por usuário.
 *
 * @class PlaylistRepository
 * @implements {IPlaylistRepository}
 */
class PlaylistRepository implements IPlaylistRepository {
  /**
   * Recupera todas as playlists de um usuário específico
   * @param userId - ID do usuário proprietário das playlists
   * @returns Array de playlists do usuário
   * @throws Erro do banco de dados
   */
  async getPlaylistsByUserId(userId: number): Promise<Playlist[]> {
    try {
      const playlists = await Playlist.findAll({ where: { userId } });

      return playlists;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cria uma nova playlist para um usuário
   * @param playlistData - Dados da playlist a ser criada
   * @returns Playlist criada com ID gerado
   * @throws Erro de validação ou banco de dados
   */
  async createPlaylist(playlistData: PlaylistData): Promise<Playlist> {
    try {
      const newPlaylist = await Playlist.create(playlistData);

      return newPlaylist;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Atualiza os dados de uma playlist existente com transação
   * @param playlistId - ID da playlist a ser atualizada
   * @param playlistData - Novos dados da playlist
   * @returns Playlist atualizada
   * @throws Erro se playlist não encontrada ou erro do banco
   */
  async updatePlaylist(
    playlistId: number,
    playlistData: PlaylistData
  ): Promise<Playlist> {
    const transaction = await Playlist.sequelize?.transaction();

    try {
      const playlist = await Playlist.findByPk(playlistId, { transaction });

      if (!playlist) {
        throw new Error(`Playlist com ID ${playlistId} não encontrada.`);
      }

      await playlist.update(playlistData, { transaction });

      await transaction?.commit();

      return playlist;
    } catch (error) {
      await transaction?.rollback();

      throw error;
    }
  }

  /**
   * Remove uma playlist do banco de dados
   * @param playlistId - ID da playlist a ser removida
   * @returns true se removida com sucesso, false se não encontrada
   * @throws Erro do banco de dados
   */
  async deletePlaylist(playlistId: number): Promise<boolean> {
    try {
      const result = await Playlist.destroy({ where: { id: playlistId } });

      return result > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default new PlaylistRepository();
