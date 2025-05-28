/**
 * Interface do Serviço Administrativo - HyperMusic API v2.0
 *
 * Define o contrato para operações administrativas de alto privilégio,
 * incluindo gestão completa de usuários e músicas com operações
 * CRUD e funcionalidades destrutivas.
 *
 * @interface AdminService
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Music, User } from "../../models";
import { MusicData, ResponseError, ResponseSuccess } from "../interfaces";

/**
 * Contrato para serviços administrativos
 * 
 * Define operações administrativas de alto privilégio para gestão
 * completa de usuários e músicas do sistema. Todas as operações
 * requerem permissões de administrador.
 */
export interface AdminService {
  /**
   * Lista todos os usuários do sistema com paginação
   *
   * @param limit - Número máximo de usuários a retornar
   * @param offset - Número de registros a pular
   * @returns Promise com array de usuários ou erro
   */
  getAllUsers(
    limit: number,
    offset: number
  ): Promise<ResponseError | ResponseSuccess<User[]>>;

  /**
   * Busca usuários por termo (username ou email)
   *
   * @param term - Termo de busca
   * @param limit - Número máximo de resultados
   * @param offset - Número de registros a pular
   * @returns Promise com usuários encontrados ou erro
   */
  getUserByTerm(
    term: string,
    limit: number,
    offset: number
  ): Promise<ResponseError | ResponseSuccess<User[]>>;

  /**
   * Remove todos os usuários do sistema
   *
   * ⚠️ OPERAÇÃO DESTRUTIVA - Use com extrema cautela
   *
   * @returns Promise com confirmação ou erro
   */
  deleteAllUsers(): Promise<ResponseError | ResponseSuccess<null>>;

  /**
   * Cria uma nova música no catálogo
   *
   * @param musicData - Dados completos da música
   * @returns Promise com confirmação ou erro
   */
  createMusic(
    musicData: MusicData
  ): Promise<ResponseError | ResponseSuccess<null>>;

  /**
   * Atualiza dados de uma música existente
   *
   * @param musicId - ID da música a ser atualizada
   * @param musicData - Dados parciais para atualização
   * @returns Promise com música atualizada ou erro
   */
  updateMusic(
    musicId: number,
    musicData: Partial<MusicData>
  ): Promise<ResponseError | ResponseSuccess<Music>>;

  /**
   * Remove uma música específica do catálogo
   *
   * @param musicId - ID da música a ser removida
   * @returns Promise com confirmação ou erro
   */
  deleteMusic(musicId: number): Promise<ResponseError | ResponseSuccess<null>>;

  /**
   * Remove todas as músicas do catálogo
   *
   * ⚠️ OPERAÇÃO DESTRUTIVA - Use com extrema cautela
   *
   * @returns Promise com confirmação ou erro
   */
  deleteAllMusic(): Promise<ResponseError | ResponseSuccess<null>>;
}
