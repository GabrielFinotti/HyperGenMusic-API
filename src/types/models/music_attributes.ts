/**
 * Atributos do Modelo Music - HyperMusic API v2.0
 *
 * Define a estrutura de dados para o modelo Music, incluindo
 * metadados da música, URLs de recursos e informações técnicas.
 *
 * @interface MusicAttributes
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
export interface MusicAttributes {
  /** ID único da música (chave primária) */
  id: number;
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
