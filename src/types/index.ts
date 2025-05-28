/**
 * Agregador Principal de Tipos - HyperMusic API v2.0
 *
 * Centraliza e exporta todos os tipos, interfaces e contratos
 * da aplicação, fornecendo um ponto único de importação para
 * toda a tipagem TypeScript do projeto.
 *
 * Categorias exportadas (completamente implementadas):
 * - Model Attributes: Estruturas de dados dos modelos ✅
 * - Repository Interfaces: Contratos de acesso a dados ✅
 * - Service Interfaces: Contratos de lógica de negócio ✅ (12 métodos implementados)
 * - Data Interfaces: DTOs para entrada de dados ✅
 * - Response Interfaces: Padrões de resposta da API ✅
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import {
  UserAttributes,
  LikedMusicsAttributes,
  MusicAttributes,
  PlaylistAttributes,
  PlaylistMusicsAttributes,
} from "./models";
import {
  ILikedMusicRepository,
  IMusicRepository,
  IPlaylistMusicRepository,
  IPlaylistRepository,
  IUserRepository,
} from "./repositories";
import {
  UserService,
  MusicService,
  AdminService,
  PlaylistService,
  LikedMusicService,
} from "./services";
import {
  UserData,
  LikedMusicData,
  MusicData,
  PlaylistData,
  PlaylistMusicData,
  ResponseError,
  ResponseSuccess,
} from "./interfaces";

export type {
  // Model Attributes
  UserAttributes,
  LikedMusicsAttributes,
  MusicAttributes,
  PlaylistAttributes,
  PlaylistMusicsAttributes,
  // Data Transfer Objects
  UserData,
  LikedMusicData,
  MusicData,
  PlaylistData,
  PlaylistMusicData,
  // Response Patterns
  ResponseError,
  ResponseSuccess,
  // Repository Interfaces
  ILikedMusicRepository,
  IMusicRepository,
  IPlaylistMusicRepository,
  IPlaylistRepository,
  IUserRepository,
  // Service Interfaces
  UserService,
  MusicService,
  AdminService,
  PlaylistService,
  LikedMusicService,
};
