/**
 * Constantes de Autenticação - HyperMusic API v2.0
 *
 * Define configurações de tempo de vida para tokens JWT,
 * incluindo durações para diferentes tipos de autenticação
 * (temporária e de longa duração).
 *
 * Configurações:
 * - MIN_TEMP: Duração mínima para tokens temporários
 * - MAX_TEMP: Duração máxima para tokens de longa duração
 * - Valores em segundos para compatibilidade com JWT
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 *
 * @example
 * ```typescript
 * // Token de curta duração (24h)
 * jwt.sign(payload, secret, { expiresIn: authTokenTemp.MIN_TEMP });
 *
 * // Token de longa duração (30 dias)
 * jwt.sign(payload, secret, { expiresIn: authTokenTemp.MAX_TEMP });
 * ```
 */

/** Tempos de expiração para tokens JWT */
export const authTokenTemp = {
  /** Token de curta duração: 24 horas em segundos */
  MIN_TEMP: 24 * 60 * 60,
  /** Token de longa duração: 30 dias em segundos */
  MAX_TEMP: 30 * 24 * 60 * 60,
};
