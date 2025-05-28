/**
 * Utilitário de Criação de Respostas de Erro - HyperMusic API v2.0
 *
 * Fornece padronização para criação de respostas de erro consistentes
 * em toda a API, seguindo a interface ResponseError estabelecida
 * para garantir uniformidade nas mensagens de erro.
 *
 * Funcionalidades:
 * - Criação de objetos de erro padronizados
 * - Suporte a códigos HTTP personalizados
 * - Mensagens descritivas de erro
 * - Garantia de tipagem TypeScript
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { ResponseError } from "../../types";

/**
 * Utilitário para criação de respostas de erro padronizadas
 *
 * Cria objetos de resposta de erro seguindo o padrão estabelecido
 * pela interface ResponseError, garantindo consistência em toda a API.
 *
 * @param message - Mensagem descritiva do erro
 * @param errorCode - Código HTTP de status do erro
 * @returns Objeto ResponseError padronizado
 *
 * @example
 * ```typescript
 * // Erro de validação
 * const error = createErrorResponse("Invalid email format", 400);
 *
 * // Erro de servidor
 * const serverError = createErrorResponse("Internal server error", 500);
 * ```
 */
const createErrorResponse = (message: string, errorCode: number): ResponseError => {
  return {
    success: false,
    message,
    errorCode,
  };
};

export default createErrorResponse;
