/**
 * Interface do Repositório de Playlists - HyperGenMusic API v2.0
 *
 * Define o contrato para operações de acesso a dados relacionadas
 * ao modelo Playlist, estabelecendo métodos para CRUD de playlists
 * de usuários.
 *
 * @interface IPlaylistRepository
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Playlist } from "../../models";
import { PlaylistData } from "../interfaces";

/**
 * Contrato para repositório de playlists
 * 
 * Define métodos para gerenciamento de playlists de usuários
 * incluindo criação, atualização, busca e remoção.
 */
export interface IPlaylistRepository {
  /**
   * Recupera todas as playlists de um usuário
   * @param userId - ID do usuário proprietário
   * @returns Array de playlists do usuário
   */
  getPlaylistsByUserId(userId: number): Promise<Playlist[]>;
  
  /**
   * Cria nova playlist para o usuário
   * @param playlistData - Dados da playlist a criar
   * @returns Playlist criada
   */
  createPlaylist(playlistData: PlaylistData): Promise<Playlist>;
  
  /**
   * Atualiza dados da playlist
   * @param playlistId - ID da playlist a atualizar
   * @param playlistData - Novos dados da playlist
   * @returns Playlist atualizada
   */
  updatePlaylist(
    playlistId: number,
    playlistData: PlaylistData
  ): Promise<Playlist>;
  
  /**
   * Remove playlist pelo ID
   * @param playlistId - ID da playlist a remover
   * @returns true se removida com sucesso
   */
  deletePlaylist(playlistId: number): Promise<boolean>;
}
