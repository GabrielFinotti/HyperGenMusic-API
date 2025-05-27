/**
 * Interface do Serviço de Playlists - HyperGenMusic API v2.0
 *
 * Define o contrato para a camada de lógica de negócio relacionada
 * ao gerenciamento de playlists, incluindo operações CRUD de playlists
 * e gerenciamento completo de músicas dentro das playlists.
 *
 * @interface PlaylistService
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { Playlist } from "../../models";
import {
  PlaylistData,
  PlaylistMusicData,
  ResponseError,
  ResponseSuccess,
} from "../interfaces";

/**
 * Contrato para serviços de playlists
 * 
 * Define o contrato para todas as operações de negócio envolvendo playlists,
 * incluindo CRUD completo de playlists e gerenciamento de músicas com posicionamento.
 */
export interface PlaylistService {
  /**
   * Recupera todas as playlists de um usuário específico
   *
   * @param userId - ID único do usuário proprietário
   * @returns Promise com array de playlists do usuário ou erro
   */
  getPlaylistByUserId(
    userId: number
  ): Promise<ResponseError | ResponseSuccess<Playlist[]>>;
  
  /**
   * Cria uma nova playlist para o usuário
   *
   * @param playlistData - Dados completos da playlist a ser criada
   * @returns Promise com playlist criada ou erro de validação
   */
  createPlaylist(
    playlistData: PlaylistData
  ): Promise<ResponseError | ResponseSuccess<Playlist>>;
  
  /**
   * Atualiza os dados de uma playlist existente
   *
   * @param playlistId - ID único da playlist a ser atualizada
   * @param playlistData - Novos dados da playlist (parciais permitidos)
   * @returns Promise com playlist atualizada ou erro
   */
  updatePlaylist(
    playlistId: number,
    playlistData: Partial<PlaylistData>
  ): Promise<ResponseError | ResponseSuccess<Playlist>>;
  
  /**
   * Remove uma playlist do sistema
   *
   * @param playlistId - ID único da playlist a ser removida
   * @returns Promise com confirmação de remoção ou erro
   */
  deletePlaylist(
    playlistId: number
  ): Promise<ResponseError | ResponseSuccess<boolean>>;
  
  /**
   * Recupera todas as músicas de uma playlist ordenadas por posição
   *
   * @param playlistId - ID único da playlist
   * @returns Promise com array de dados das músicas da playlist ou erro
   */
  getMusicsByPlaylistId(
    playlistId: number
  ): Promise<ResponseError | ResponseSuccess<PlaylistMusicData[]>>;
  
  /**
   * Adiciona uma música a uma playlist em posição específica
   *
   * @param playlistMusicData - Dados da associação playlist-música com posição
   * @returns Promise com dados da música adicionada ou erro
   */
  addMusicToPlaylist(
    playlistMusicData: PlaylistMusicData
  ): Promise<ResponseError | ResponseSuccess<PlaylistMusicData>>;
  
  /**
   * Atualiza a posição de uma música dentro da playlist
   *
   * @param playlistId - ID único da playlist
   * @param musicId - ID único da música
   * @param newPosition - Nova posição da música na playlist
   * @returns Promise com confirmação de atualização ou erro
   */
  updateMusicPosition(
    playlistId: number,
    musicId: number,
    newPosition: number
  ): Promise<ResponseError | ResponseSuccess<boolean>>;
  
  /**
   * Remove uma música específica de uma playlist
   *
   * @param playlistId - ID único da playlist
   * @param musicId - ID único da música a ser removida
   * @returns Promise com confirmação de remoção ou erro
   */
  removeMusicFromPlaylist(
    playlistId: number,
    musicId: number
  ): Promise<ResponseError | ResponseSuccess<boolean>>;
}
