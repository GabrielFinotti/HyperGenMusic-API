/**
 * Atributos do Modelo LikedMusics - HyperGenMusic API v2.0
 *
 * Define a estrutura de dados para o modelo LikedMusics que representa
 * o relacionamento many-to-many entre usuários e suas músicas curtidas.
 *
 * @interface LikedMusicsAttributes
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
export interface LikedMusicsAttributes {
  /** ID do usuário que curtiu a música (chave estrangeira) */
  userId: number;
  /** ID da música curtida (chave estrangeira) */
  musicId: number;
}
