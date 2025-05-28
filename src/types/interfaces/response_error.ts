/**
 * Interface de Resposta de Erro - HyperMusic API v2.0
 *
 * Define a estrutura padronizada para respostas de erro da API,
 * garantindo consistência na comunicação de falhas aos clientes.
 *
 * @interface ResponseError
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
export interface ResponseError {
  /** Indica que a operação falhou (sempre false) */
  success: boolean;
  /** Mensagem descritiva do erro para o usuário */
  message: string;
  /** Código HTTP do erro (400, 401, 404, 500, etc.) */
  errorCode: number;
}
