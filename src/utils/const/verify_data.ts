/**
 * Constantes de Validação de Dados - HyperMusic API v2.0
 *
 * Define padrões de validação, limites de caracteres e expressões
 * regulares utilizadas em toda a aplicação para garantir
 * consistência na validação de dados de entrada.
 *
 * Inclui:
 * - Limites mínimos de caracteres para campos
 * - Expressões regulares para validação de formato
 * - Padrões para email, URLs e outros formatos
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 *
 * @example
 * ```typescript
 * import { minChar, regex } from "../const";
 *
 * // Verificar comprimento mínimo
 * if (username.length < minChar.MIN_CHARS_USERNAME) {
 *   // erro
 * }
 *
 * // Validar formato de email
 * if (!regex.email.test(email)) {
 *   // erro
 * }
 * ```
 */

/** Limites de caracteres para campos de texto */
export const minChar = {
  /** Mínimo de caracteres para nome de usuário */
  MIN_CHARS_USERNAME: 6,
  /** Máximo de caracteres para nome de usuário */
  MAX_CHARS_USERNAME: 12,
  /** Mínimo de caracteres para senha */
  MIN_CHARS_PASSWORD: 8,
  /** Máximo de caracteres para senha */
  MAX_CHARS_PASSWORD: 20,
};

/** Expressões regulares para validação de formato */
export const regex = {
  /** Validação de formato de email */
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  /** Validação de formato de senha */
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/,
  /** Validação de formato de telefone */
  phone: /^\d{11}$/,
  /** Validação de formato de URL */
  url: /^(https?:\/\/)?([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/[^\s]*)?$/,
};
