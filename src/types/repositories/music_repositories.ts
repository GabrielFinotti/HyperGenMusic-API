/**
 * Interface do Repositório de Músicas - HyperMusic API v2.0
 *
 * Define o contrato para operações de acesso a dados relacionadas
 * ao modelo Music, estabelecendo métodos para CRUD completo e consultas
 * especializadas como busca por termo e filtro por gênero.
 *
 * @interface IMusicRepository
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Music } from "../../models";
import { MusicAttributes } from "../models";

/**
 * Contrato para repositório de músicas
 * 
 * Define todos os métodos necessários para operações de persistência
 * e consulta de dados do catálogo musical.
 */
export interface IMusicRepository {
  /**
   * Recupera todas as músicas com paginação
   * @param limit - Número máximo de músicas por página
   * @param offset - Número de registros a pular
   * @returns Array de músicas ou null se não encontrar
   */
  getAllMusics(limit: number, offset: number): Promise<Music[] | null>;
  
  /**
   * Busca música pelo ID
   * @param musicId - ID único da música
   * @returns Música encontrada ou null
   */
  getMusicById(musicId: number): Promise<Music | null>;
  
  /**
   * Busca músicas por termo com paginação
   * @param term - Termo de busca (título, artista)
   * @param limit - Número máximo de resultados
   * @param offset - Número de registros a pular
   * @returns Array de músicas ou null
   */
  getMusicByTerm(
    term: string,
    limit: number,
    offset: number
  ): Promise<Music[] | null>;
  
  /**
   * Busca músicas por gênero com paginação
   * @param genre - Gênero musical para filtrar
   * @param limit - Número máximo de resultados
   * @param offset - Número de registros a pular
   * @returns Array de músicas ou null
   */
  getMusicByGenre(
    genre: string,
    limit: number,
    offset: number
  ): Promise<Music[] | null>;
  
  /**
   * Cria nova música no catálogo
   * @param music - Dados parciais da música
   * @returns Promise void
   */
  createMusic(music: Partial<MusicAttributes>): Promise<void>;
  
  /**
   * Atualiza dados da música
   * @param musicId - ID da música a atualizar
   * @param data - Dados parciais para atualização
   * @returns Música atualizada
   */
  updateMusic(musicId: number, data: Partial<MusicAttributes>): Promise<Music>;
  
  /**
   * Remove música pelo ID
   * @param musicId - ID da música a remover
   * @returns Promise void
   */
  deleteMusic(musicId: number): Promise<void>;
  
  /**
   * Remove todas as músicas (operação destrutiva)
   * @returns Número de músicas removidas
   */
  deleteAllMusic(): Promise<number>;
}
