/**
 * Agregador de Interfaces - HyperGenMusic API v2.0
 *
 * Centraliza e exporta todas as interfaces de dados e contratos
 * da aplicação, incluindo DTOs de entrada e padrões de resposta.
 *
 * Interfaces de Dados:
 * - UserData: Dados de usuário para criação/atualização
 * - MusicData: Dados de música para operações CRUD
 * - PlaylistData: Dados de playlist
 * - PlaylistMusicData: Associação playlist-música com posição
 * - LikedMusicData: Associação usuário-música curtida
 *
 * Interfaces de Resposta:
 * - ResponseError: Padrão de resposta de erro da API
 * - ResponseSuccess: Padrão de resposta de sucesso da API
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { UserData } from "./user_data";
import { MusicData } from "./music_data";
import { PlaylistData } from "./playlist_data";
import { PlaylistMusicData } from "./playlist_music_data";
import { LikedMusicData } from "./liked_music_data";
import { ResponseError } from "./response_error";
import { ResponseSuccess } from "./response_success";

export {
  UserData,
  MusicData,
  PlaylistData,
  PlaylistMusicData,
  LikedMusicData,
  ResponseError,
  ResponseSuccess,
};
