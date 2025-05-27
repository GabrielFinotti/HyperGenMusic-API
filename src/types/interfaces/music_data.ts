/**
 * Interface de Dados de Música - HyperGenMusic API v2.0
 *
 * Define a estrutura de dados para operações de entrada de música,
 * como criação e atualização, excluindo campos gerados automaticamente.
 *
 * @interface MusicData
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
export interface MusicData {
  /** Título da música */
  title: string;
  /** Nome do artista ou banda */
  artist: string;
  /** Gênero musical (opcional) */
  genre?: string;
  /** URL da capa/imagem da música (opcional) */
  imageUrl?: string;
  /** Duração da música em segundos */
  duration: number;
  /** URL do arquivo de áudio */
  songUrl: string;
}
