import { AppError } from './AppError';
import { DefaultResponseResult } from '../../../types';
import { responseHandling } from '../response';
import 'colors';

/**
 * Log detalhado de erros com formatação em cores para melhor visibilidade
 */
const logError = (error: Error | AppError, additionalInfo?: string) => {
  const timestamp = new Date().toISOString();
  
  console.error(`[${timestamp}] ${'ERRO'.red.bgBlack} ${error.name.yellow}: ${error.message}`.red);
  
  if (additionalInfo) {
    console.error(`  Informação adicional: ${additionalInfo}`.yellow.bgBlack);
  }
  
  if (error instanceof AppError && error.context) {
    console.error(`  Contexto: ${JSON.stringify(error.context)}`.yellow.bgBlack);
  }
  
  console.error(`  Stack: ${error.stack?.split('\n').slice(1).join('\n')}`.gray.bgBlack);
};

/**
 * Converte um erro em uma resposta formatada
 */
const formatError = (error: Error | AppError): DefaultResponseResult => {
  // Se for nosso AppError, usamos suas informações
  if (error instanceof AppError) {
    return responseHandling.defaultResponseImpl(
      false,
      error.statusCode,
      error.message,
      error.isOperational ? { errorCode: error.errorCode } : undefined
    );
  }

  // Para erros não estruturados, tratamos como erro interno
  return responseHandling.defaultResponseImpl(
    false,
    500,
    'O servidor encontrou um erro inesperado. Por favor, tente novamente mais tarde!'
  );
};

/**
 * Wrapper para funções assíncronas que captura erros e retorna respostas formatadas
 */
function asyncErrorHandler<T>(
  fn: (...args: any[]) => Promise<T>,
  errorMessage = 'Erro inesperado'
): (...args: any[]) => Promise<T | DefaultResponseResult> {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      const appError = error instanceof AppError
        ? error
        : new AppError(
            error instanceof Error ? error.message : errorMessage,
            500,
            false
          );

      logError(appError, `Ocorreu durante chamada de ${fn.name || 'função anônima'}`);
      return formatError(appError);
    }
  };
}

export const errorHandler = {
  logError,
  formatError,
  asyncErrorHandler,
  AppError,
};
