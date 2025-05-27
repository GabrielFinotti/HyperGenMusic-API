/**
 * Interface do Repositório de Playlists - HyperGenMusic API v2.0
 *
 * Define o contrato para operações de acesso a dados relacionadas
 * ao modelo Playlist, estabelecendo métodos para CRUD completo de 
 * playlists de usuários, incluindo consultas por usuário e por ID.
 *
 * Métodos definidos:
 * - getPlaylistsByUserId: Busca por usuário
 * - getPlaylistById: Busca por ID específico
 * - createPlaylist: Criação de playlist
 * - updatePlaylist: Atualização de dados
 * - deletePlaylist: Remoção segura
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
 * Define métodos para gerenciamento completo de playlists de usuários
 * incluindo criação, atualização, busca por usuário/ID e remoção segura.
 */
export interface IPlaylistRepository {
  /**
   * Recupera todas as playlists de um usuário
   * @param userId - ID do usuário proprietário
   * @returns Array de playlists do usuário
   */
  getPlaylistsByUserId(userId: number): Promise<Playlist[]>;

  /**
   * Recupera uma playlist pelo ID
   * @param playlistId - ID da playlist a recuperar
   * @returns Playlist encontrada ou null se não existir
   */
  getPlaylistById(playlistId: number): Promise<Playlist | null>;

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
    playlistData: Partial<PlaylistData>
  ): Promise<Playlist>;

  /**
   * Remove playlist pelo ID
   * @param playlistId - ID da playlist a remover
   * @returns true se removida com sucesso
   */
  deletePlaylist(playlistId: number): Promise<boolean>;
}
