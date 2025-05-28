/**
 * Interface do Serviço de Usuários - HyperMusic API v2.0
 *
 * Define o contrato para a camada de lógica de negócio relacionada
 * aos usuários, incluindo autenticação, registro e gestão de perfil.
 *
 * @interface UserService
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { User } from "../../models";
import { ResponseError, ResponseSuccess, UserData } from "../interfaces";

/**
 * Contrato para serviços de usuário
 * 
 * Define métodos para lógica de negócio relacionada a usuários,
 * incluindo operações de autenticação e gerenciamento de conta.
 */
export interface UserService {
  /**
   * Registra novo usuário no sistema
   * @param userData - Dados completos do usuário
   * @returns Resposta de sucesso ou erro de validação
   */
  userRegister(
    userData: UserData
  ): Promise<ResponseError | ResponseSuccess<null>>;
  
  /**
   * Autentica usuário e gera token JWT
   * @param email - Email do usuário
   * @param password - Senha em texto plano
   * @returns Token JWT e dados do usuário ou erro
   */
  userLogin(
    email: string,
    password: string
  ): Promise<
    ResponseError | ResponseSuccess<({ token: string } | Partial<User>)[]>
  >;
  
  /**
   * Atualiza dados do usuário
   * @param userId - ID do usuário a atualizar
   * @param userData - Dados parciais para atualização
   * @returns Usuário atualizado ou erro
   */
  userUpdate(
    userId: number,
    userData: Partial<UserData>
  ): Promise<ResponseError | ResponseSuccess<User>>;
  
  /**
   * Remove conta do usuário e revoga tokens
   * @param userId - ID do usuário a remover
   * @param token - Token JWT para revogação (opcional)
   * @returns Confirmação de remoção ou erro
   */
  userDelete(
    userId: number,
    token?: string
  ): Promise<ResponseError | ResponseSuccess<null>>;
  
  /**
   * Recupera dados do perfil do usuário
   * @param userId - ID do usuário
   * @returns Dados do usuário ou erro
   */
  getProfileData(
    userId: number
  ): Promise<ResponseError | ResponseSuccess<User>>;
}
