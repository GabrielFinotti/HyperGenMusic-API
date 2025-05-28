/**
 * Interface do Repositório de Usuários - HyperMusic API v2.0
 *
 * Define o contrato para operações de acesso a dados relacionadas
 * ao modelo User, estabelecendo métodos para CRUD completo e consultas
 * especializadas.
 *
 * @interface IUserRepository
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { User } from "../../models";
import { UserAttributes } from "../models";

/**
 * Contrato para repositório de usuários
 *
 * Define todos os métodos necessários para operações de persistência
 * e consulta de dados de usuários no sistema.
 */
export interface IUserRepository {
  /**
   * Recupera todos os usuários com paginação
   * @param limit - Número máximo de usuários por página
   * @param offset - Número de registros a pular
   * @returns Array de usuários ou null se não encontrar
   */
  getAllUsers(limit: number, offset: number): Promise<User[] | null>;

  /**
   * Busca usuário pelo ID
   * @param userId - ID único do usuário
   * @returns Usuário encontrado ou null
   */
  getUserById(userId: number): Promise<User | null>;

  /**
   * Busca usuário pelo email
   * @param email - Email único do usuário
   * @returns Usuário encontrado ou null
   */
  getUserByEmail(email: string): Promise<User | null>;

  /**
   * Busca usuário incluindo senha (para autenticação)
   * @param email - Email do usuário (opcional)
   * @param userId - ID do usuário (opcional)
   * @returns Usuário com senha ou null
   */
  getUserIncludingPassword(
    email?: string,
    userId?: number
  ): Promise<User | null>;

  /**
   * Busca usuários por termo com paginação
   * @param term - Termo de busca (username, email)
   * @param limit - Número máximo de resultados
   * @param offset - Número de registros a pular
   * @returns Array de usuários ou null
   */
  getUserByTerm(
    term: string,
    limit: number,
    offset: number
  ): Promise<User[] | null>;

  /**
   * Cria novo usuário
   * @param data - Dados parciais do usuário
   * @returns Promise void
   */
  createUser(data: Partial<UserAttributes>): Promise<void>;

  /**
   * Atualiza dados do usuário
   * @param userId - ID do usuário a atualizar
   * @param data - Dados parciais para atualização
   * @returns Usuário atualizado
   */
  updateUser(userId: number, data: Partial<UserAttributes>): Promise<User>;

  /**
   * Remove usuário pelo ID
   * @param userId - ID do usuário a remover
   * @returns Promise void
   */
  deleteUser(userId: number): Promise<void>;

  /**
   * Remove todos os usuários (operação destrutiva)
   * @returns Número de usuários removidos
   */
  deleteAllUsers(): Promise<number>;
}
