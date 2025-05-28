/**
 * Interface do Serviço de Músicas - HyperMusic API v2.0
 *
 * Define o contrato para a camada de lógica de negócio relacionada
 * ao catálogo musical, incluindo consultas públicas e operações de busca.
 *
 * @interface MusicService
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Music } from "../../models";
import { ResponseError, ResponseSuccess } from "../interfaces";

/**
 * Contrato para serviços de música
 * 
 * Define o contrato para todas as operações de negócio envolvendo músicas,
 * incluindo listagem, busca por termo/gênero e recuperação de dados específicos.
 */
export interface MusicService {
  /**
   * Recupera todas as músicas com paginação
   *
   * @param limit - Número máximo de músicas a retornar
   * @param offset - Número de registros a pular (para paginação)
   * @returns Promise com array de músicas ou erro
   */
  getAllMusics(
    limit: number,
    offset: number
  ): Promise<ResponseError | ResponseSuccess<Music[]>>;

  /**
   * Busca músicas por termo (título ou artista)
   *
   * @param term - Termo de busca para filtrar por título ou artista
   * @param limit - Número máximo de resultados
   * @param offset - Número de registros a pular
   * @returns Promise com músicas encontradas ou erro
   */
  getMusicByTerm(
    term: string,
    limit: number,
    offset: number
  ): Promise<ResponseError | ResponseSuccess<Music[]>>;

  /**
   * Busca músicas por gênero específico
   *
   * @param genre - Gênero musical para filtrar
   * @param limit - Número máximo de resultados
   * @param offset - Número de registros a pular
   * @returns Promise com músicas do gênero ou erro
   */
  getMusicByGenre(
    genre: string,
    limit: number,
    offset: number
  ): Promise<ResponseError | ResponseSuccess<Music[]>>;

  /**
   * Recupera dados detalhados de uma música específica
   *
   * @param musicId - ID único da música
   * @returns Promise com dados da música ou erro
   */
  getMusicData(
    musicId: number
  ): Promise<ResponseError | ResponseSuccess<Music>>;
}
