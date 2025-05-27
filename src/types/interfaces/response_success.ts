/**
 * Interface de Resposta de Sucesso - HyperGenMusic API v2.0
 *
 * Define a estrutura padronizada para respostas de sucesso da API,
 * garantindo consistência na comunicação de dados aos clientes.
 *
 * @template T - Tipo dos dados retornados na resposta
 * @interface ResponseSuccess
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
export interface ResponseSuccess<T> {
  /** Indica que a operação foi bem-sucedida (sempre true) */
  success: true;
  /** Mensagem descritiva do sucesso para o usuário */
  message: string;
  /** Dados retornados pela operação (pode ser null) */
  data: T | null;
  /** Código HTTP de sucesso (200, 201, etc.) */
  statusCode: number;
}
