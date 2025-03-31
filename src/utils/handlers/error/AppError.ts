/**
 * Classe para representar erros de aplicação com informações estruturadas
 * Facilita o tratamento uniforme de erros em toda a aplicação
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errorCode?: string;
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    statusCode = 500,
    isOperational = true,
    errorCode?: string,
    context?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorCode = errorCode;
    this.context = context;

    // Captura o stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * Cria um erro 404 - Não encontrado
   */
  static notFound(message = 'Recurso não encontrado', context?: Record<string, any>): AppError {
    return new AppError(message, 404, true, 'RESOURCE_NOT_FOUND', context);
  }

  /**
   * Cria um erro 400 - Requisição inválida
   */
  static badRequest(message: string, context?: Record<string, any>): AppError {
    return new AppError(message, 400, true, 'BAD_REQUEST', context);
  }

  /**
   * Cria um erro 401 - Não autorizado
   */
  static unauthorized(message = 'Não autorizado', context?: Record<string, any>): AppError {
    return new AppError(message, 401, true, 'UNAUTHORIZED', context);
  }

  /**
   * Cria um erro 403 - Proibido
   */
  static forbidden(message = 'Acesso proibido', context?: Record<string, any>): AppError {
    return new AppError(message, 403, true, 'FORBIDDEN', context);
  }

  /**
   * Cria um erro 409 - Conflito
   */
  static conflict(message: string, context?: Record<string, any>): AppError {
    return new AppError(message, 409, true, 'CONFLICT', context);
  }

  /**
   * Cria um erro 500 - Erro interno do servidor
   */
  static internal(message = 'Erro interno do servidor', context?: Record<string, any>): AppError {
    return new AppError(message, 500, true, 'INTERNAL_SERVER_ERROR', context);
  }
}
