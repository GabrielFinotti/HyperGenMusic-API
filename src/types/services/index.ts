/**
 * Agregador de Interfaces de Serviços - HyperMusic API v2.0
 *
 * Centraliza e exporta todas as interfaces que definem os contratos
 * da camada de serviços, estabelecendo os métodos para lógica de
 * negócio de cada módulo da aplicação.
 *
 * Interfaces completamente implementadas:
 * - UserService: Contrato para lógica de negócio de usuários ✅
 * - MusicService: Contrato para lógica de negócio de músicas ✅
 * - AdminService: Contrato para operações administrativas ✅
 * - PlaylistService: Contrato para lógica de negócio de playlists ✅ (8 métodos)
 * - LikedMusicService: Contrato para sistema de curtidas ✅ (4 métodos)
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { UserService } from "./user_service";
import { MusicService } from "./music_service";
import { AdminService } from "./admin_service";
import { PlaylistService } from "./playlist_service";
import { LikedMusicService } from "./liked_music_service";

export {
  UserService,
  MusicService,
  AdminService,
  PlaylistService,
  LikedMusicService,
};
