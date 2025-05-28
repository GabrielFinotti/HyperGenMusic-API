/**
 * Agregador de Interfaces de Repositórios - HyperMusic API v2.0
 *
 * Centraliza e exporta todas as interfaces que definem os contratos
 * da camada de repositórios, estabelecendo os métodos para acesso
 * aos dados de cada entidade do sistema.
 *
 * Interfaces incluídas:
 * - IUserRepository: Contrato para operações de usuário
 * - IMusicRepository: Contrato para operações de música
 * - IPlaylistRepository: Contrato para operações de playlist
 * - IPlaylistMusicRepository: Contrato para associações playlist-música
 * - ILikedMusicRepository: Contrato para sistema de curtidas
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { IUserRepository } from "./user_repositories";
import { IMusicRepository } from "./music_repositories";
import { IPlaylistRepository } from "./playlist_repositories";
import { IPlaylistMusicRepository } from "./playlist_music_repositories";
import { ILikedMusicRepository } from "./liked_music_repositories";

export {
  IUserRepository,
  IMusicRepository,
  IPlaylistRepository,
  IPlaylistMusicRepository,
  ILikedMusicRepository,
};
