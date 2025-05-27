/**
 * Atributos do Modelo Playlist - HyperGenMusic API v2.0
 *
 * Define a estrutura de dados para o modelo Playlist, incluindo
 * relacionamento com usuário e informações básicas.
 *
 * @interface PlaylistAttributes
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
export interface PlaylistAttributes {
  /** ID único da playlist (chave primária) */
  id: number;
  /** ID do usuário proprietário (chave estrangeira) */
  userId: number;
  /** Nome da playlist */
  name: string;
}
