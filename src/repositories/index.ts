/**
 * Agregador de Repositórios - HyperMusic API v2.0
 *
 * Centraliza e exporta todas as implementações de repositórios
 * da aplicação, facilitando importações e manutenção do código.
 *
 * Repositórios disponíveis:
 * - UserRepository: Gestão de dados de usuários
 * - MusicRepository: Gestão de catálogo musical
 * - LikedMusicRepository: Sistema de curtidas
 * - PlaylistRepository: Gestão de playlists
 * - PlaylistMusicRepository: Relacionamento playlist-música
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import UserRepository from "./user_repository";
import MusicRepository from "./music_repository";
import LikedMusicRepository from "./liked_music_repository";
import PlaylistRepository from "./playlist_repository";
import PlaylistMusicRepository from "./playlist_music_repository";

export {
  UserRepository,
  MusicRepository,
  LikedMusicRepository,
  PlaylistRepository,
  PlaylistMusicRepository,
};
