/**
 * Agregador de Utilitários de Resposta - HyperGenMusic API v2.0
 *
 * Centraliza e exporta todas as funções para padronização
 * de respostas HTTP da API.
 *
 * Utilitários incluídos:
 * - createErrorResponse: Padronização de respostas de erro
 * - createSuccessResponse: Padronização de respostas de sucesso
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import createErrorResponse from "./create_error_response";
import createSuccessResponse from "./create_success_response";

export { createErrorResponse, createSuccessResponse };
