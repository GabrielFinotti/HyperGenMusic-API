/**
 * Interface de Dados de Música Curtida - HyperMusic API v2.0
 *
 * Define a estrutura de dados para operações de curtida/descurtida,
 * representando a associação entre usuário e música.
 *
 * @interface LikedMusicData
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
export interface LikedMusicData {
  /** ID do usuário que curtiu a música */
  userId: number;
  /** ID da música curtida */
  musicId: number;
}
