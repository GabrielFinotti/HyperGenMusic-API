/**
 * Implementação padrão de respostas da API
 */
import { DefaultResponseFunction, DefaultResponseResult } from "../../../types";

/**
 * Cria uma resposta padrão para a API
 * @param isSuccess - Indica se a operação foi bem-sucedida
 * @param statusCode - Código de status HTTP
 * @param message - Mensagem ou mensagens (opcional)
 * @param data - Dados da resposta (opcional)
 * @returns Objeto de resposta padronizado
 */
export const defaultResponseImpl: DefaultResponseFunction = <T = any>(
  isSuccess: boolean,
  statusCode: number,
  message?: string | string[],
  data?: T
): DefaultResponseResult<T> => {
  return {
    isSuccess,
    statusCode,
    message,
    data,
  };
};

/**
 * Atalho para respostas de sucesso
 */
export const successResponse = <T = any>(
  message: string | string[] = "Operação realizada com sucesso",
  data?: T,
  statusCode = 200
): DefaultResponseResult<T> => {
  return defaultResponseImpl(true, statusCode, message, data);
};

/**
 * Atalho para respostas de erro
 */
export const errorResponse = <T = any>(
  message: string | string[] = "Ocorreu um erro ao processar a solicitação",
  statusCode = 500,
  data?: T
): DefaultResponseResult<T> => {
  return defaultResponseImpl(false, statusCode, message, data);
};
