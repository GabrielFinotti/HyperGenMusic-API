/**
 * Utilitário de Criação de Respostas de Sucesso - HyperMusic API v2.0
 *
 * Fornece padronização para criação de respostas de sucesso consistentes
 * em toda a API, seguindo a interface ResponseSuccess estabelecida
 * para garantir uniformidade nas mensagens de sucesso com dados tipados.
 *
 * Funcionalidades:
 * - Criação de objetos de sucesso padronizados
 * - Suporte a dados tipados com generics
 * - Mensagens descritivas de sucesso
 * - Garantia de type safety TypeScript
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { ResponseSuccess } from "../../types";

/**
 * Utilitário para criação de respostas de sucesso padronizadas
 *
 * Cria objetos de resposta de sucesso tipados seguindo o padrão
 * estabelecido pela interface ResponseSuccess, garantindo consistência
 * e type safety em toda a API.
 *
 * @template T - Tipo dos dados de resposta
 * @param message - Mensagem descritiva do sucesso
 * @param data - Dados de resposta (pode ser null)
 * @param statusCode - Código HTTP de status de sucesso
 * @returns Objeto ResponseSuccess tipado e padronizado
 *
 * @example
 * ```typescript
 * // Resposta com dados
 * const success = createSuccessResponse("User created", user, 201);
 *
 * // Resposta sem dados
 * const deleted = createSuccessResponse("User deleted", null, 204);
 * ```
 */
const createSuccessResponse = <T>(
  message: string,
  data: T | null,
  statusCode: number
): ResponseSuccess<T> => {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
};

export default createSuccessResponse;
