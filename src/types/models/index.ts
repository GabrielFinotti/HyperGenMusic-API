/**
 * Agregador de Atributos de Modelos - HyperMusic API v2.0
 *
 * Centraliza e exporta todas as interfaces de atributos dos modelos
 * da aplicação, definindo a estrutura de dados para cada entidade.
 *
 * Tipos disponíveis:
 * - UserAttributes: Estrutura de dados do usuário
 * - MusicAttributes: Estrutura de dados da música
 * - PlaylistAttributes: Estrutura de dados da playlist
 * - LikedMusicsAttributes: Relacionamento usuário-música curtida
 * - PlaylistMusicsAttributes: Relacionamento playlist-música
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { UserAttributes } from "./user_attributes";
import { PlaylistMusicsAttributes } from "./playlist_musics_attributes";
import { PlaylistAttributes } from "./playlist_attributes";
import { MusicAttributes } from "./music_attributes";
import { LikedMusicsAttributes } from "./liked_musics_attributes";

export {
  LikedMusicsAttributes,
  MusicAttributes,
  PlaylistAttributes,
  PlaylistMusicsAttributes,
  UserAttributes,
};
