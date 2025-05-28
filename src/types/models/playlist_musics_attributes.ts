/**
 * Atributos do Modelo PlaylistMusics - HyperMusic API v2.0
 *
 * Define a estrutura de dados para o modelo PlaylistMusics que representa
 * o relacionamento many-to-many entre playlists e músicas com posicionamento.
 *
 * @interface PlaylistMusicsAttributes
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
export interface PlaylistMusicsAttributes {
  /** ID da playlist (chave estrangeira) */
  playlistId: number;
  /** ID da música (chave estrangeira) */
  musicId: number;
  /** Posição da música na playlist (para ordenação) */
  position: number;
}
