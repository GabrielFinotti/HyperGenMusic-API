/**
 * Interface do Repositório de Músicas da Playlist - HyperMusic API v2.0
 *
 * Define o contrato para operações de acesso a dados relacionadas
 * ao modelo PlaylistMusics, estabelecendo métodos para gerenciamento
 * da relação many-to-many entre playlists e músicas.
 *
 * @interface IPlaylistMusicRepository
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { PlaylistMusics } from "../../models";
import { PlaylistMusicData } from "../interfaces";

/**
 * Contrato para repositório de músicas da playlist
 * 
 * Gerencia as operações de acesso a dados para a tabela de junção
 * entre playlists e músicas, incluindo controle de posicionamento.
 */
export interface IPlaylistMusicRepository {
  /**
   * Adiciona uma música a uma playlist em posição específica
   *
   * @param data - Dados contendo playlistId, musicId e position
   * @returns Promise com registro de associação criado
   */
  addMusicToPlaylist(data: PlaylistMusicData): Promise<PlaylistMusics>;

  /**
   * Remove uma música específica de uma playlist
   *
   * @param playlistId - ID da playlist
   * @param musicId - ID da música a ser removida
   * @returns Promise com true se removida com sucesso
   */
  removeMusicFromPlaylist(
    playlistId: number,
    musicId: number
  ): Promise<boolean>;

  /**
   * Recupera todas as músicas de uma playlist
   *
   * @param playlistId - ID da playlist
   * @returns Promise com array de associações playlist-música
   */
  getMusicsByPlaylistId(playlistId: number): Promise<PlaylistMusics[]>;

  /**
   * Atualiza a posição de uma música dentro da playlist
   *
   * @param playlistId - ID da playlist
   * @param musicId - ID da música
   * @param newPosition - Nova posição da música
   * @returns Promise com true se atualizada com sucesso
   */
  updateMusicPosition(
    playlistId: number,
    musicId: number,
    newPosition: number
  ): Promise<boolean>;
}
