/**
 * Utilitário de Validação de Dados de Usuário - HyperGenMusic API v2.0
 *
 * Fornece validação robusta de dados de usuário para operações de
 * criação e atualização, aplicando regras de negócio específicas
 * como formato de email, força de senha e validação de campos.
 *
 * Funcionalidades:
 * - Validação completa para criação de usuário
 * - Validação parcial para atualizações
 * - Verificação de formato de email com regex
 * - Validação de força de senha
 * - Verificação de tipos e comprimentos mínimos
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import { UserData } from "../../types";
import { minChar, regex } from "../const";

/**
 * Funções sobrecarregadas para validação de dados de usuário
 *
 * Valida dados de usuário de acordo com regras de negócio estabelecidas,
 * suportando tanto criação (dados completos) quanto atualização (dados parciais).
 *
 * @param userData - Dados do usuário a serem validados
 * @param isUpdate - Se true, permite validação parcial; se false, exige dados completos
 * @returns String com erros encontrados (vazia se válido)
 *
 * @example
 * ```typescript
 * // Validação para criação (dados completos obrigatórios)
 * const errors = verifyUserData(newUser, false);
 *
 * // Validação para atualização (dados parciais permitidos)
 * const updateErrors = verifyUserData({ email: "new@email.com" }, true);
 * ```
 */
function verifyUserData(userData: UserData, isUpdate: false): string;
function verifyUserData(userData: Partial<UserData>, isUpdate: true): string;

function verifyUserData(
  userData: UserData | Partial<UserData>,
  isUpdate: boolean
): string {
  const errors: string[] = [];

  if (isUpdate) {
    if (userData.username && userData.username !== userData.username.trim()) {
      errors.push("Username cannot have leading or trailing spaces");
    }
    if (userData.password && userData.password !== userData.password.trim()) {
      errors.push("Password cannot have leading or trailing spaces");
    }

    if (
      userData.username &&
      (userData.username.length < minChar.MIN_CHARS_USERNAME ||
        userData.username.length > minChar.MAX_CHARS_USERNAME)
    ) {
      errors.push(
        `Username must be between ${minChar.MIN_CHARS_USERNAME} and ${minChar.MAX_CHARS_USERNAME} characters`
      );
    }
    if (
      userData.password &&
      (userData.password.length < minChar.MIN_CHARS_PASSWORD ||
        userData.password.length > minChar.MAX_CHARS_PASSWORD)
    ) {
      errors.push(
        `Password must be between ${minChar.MIN_CHARS_PASSWORD} and ${minChar.MAX_CHARS_PASSWORD} characters`
      );
    }

    if (userData.password && !regex.password.test(userData.password)) {
      errors.push(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }
    if (userData.email && !regex.email.test(userData.email)) {
      errors.push("Email format is invalid");
    }
  } else {
    const fullUserData = userData as UserData;

    if (fullUserData.username !== fullUserData.username.trim()) {
      errors.push("Username cannot have leading or trailing spaces");
    }
    if (fullUserData.password !== fullUserData.password.trim()) {
      errors.push("Password cannot have leading or trailing spaces");
    }

    if (
      fullUserData.username.length < minChar.MIN_CHARS_USERNAME ||
      fullUserData.username.length > minChar.MAX_CHARS_USERNAME
    ) {
      errors.push(
        `Username must be between ${minChar.MIN_CHARS_USERNAME} and ${minChar.MAX_CHARS_USERNAME} characters`
      );
    }
    if (
      fullUserData.password.length < minChar.MIN_CHARS_PASSWORD ||
      fullUserData.password.length > minChar.MAX_CHARS_PASSWORD
    ) {
      errors.push(
        `Password must be between ${minChar.MIN_CHARS_PASSWORD} and ${minChar.MAX_CHARS_PASSWORD} characters`
      );
    }

    if (!regex.password.test(fullUserData.password)) {
      errors.push(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }
    if (!regex.email.test(fullUserData.email)) {
      errors.push("Email format is invalid");
    }
  }

  if (userData.phone && !regex.phone.test(userData.phone)) {
    errors.push("Phone number format is invalid");
  }

  return errors.length > 0 ? errors.join(", ") : "";
}

export default verifyUserData;
