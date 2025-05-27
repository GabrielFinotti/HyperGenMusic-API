/**
 * Interface de Dados de Música da Playlist - HyperGenMusic API v2.0
 *
 * Define a estrutura de dados para operações de gerenciamento de músicas
 * em playlists, incluindo posicionamento para ordenação.
 *
 * @interface PlaylistMusicData
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
export interface PlaylistMusicData {
  /** ID da playlist que contém a música */
  playlistId: number;
  /** ID da música na playlist */
  musicId: number;
  /** Posição da música na playlist (para ordenação) */
  position: number;
}
