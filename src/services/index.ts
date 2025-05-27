/**
 * Agregador de Implementações de Serviços - HyperGenMusic API v2.0
 *
 * Centraliza e exporta todas as implementações concretas dos serviços
 * da aplicação, fornecendo as classes que encapsulam a lógica de negócio.
 *
 * Implementações incluídas:
 * - UserServiceImpl: Lógica de negócio para gestão de usuários
 * - MusicServiceImpl: Lógica de negócio para catálogo musical
 * - AdminServiceImpl: Lógica de negócio para operações administrativas
 * - PlaylistServiceImpl: Lógica de negócio para gerenciamento de playlists
 * - LikedMusicServiceImpl: Lógica de negócio para sistema de curtidas
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import UserServiceImpl from "./user_service_implement";
import MusicServiceImpl from "./music_service_implement";
import AdminServiceImpl from "./admin_service_implements";
import PlaylistServiceImpl from "./playlist_service_implement";
import LikedMusicServiceImpl from "./liked_music_service_implement";

export { 
  UserServiceImpl, 
  MusicServiceImpl, 
  AdminServiceImpl,
  PlaylistServiceImpl,
  LikedMusicServiceImpl 
};
