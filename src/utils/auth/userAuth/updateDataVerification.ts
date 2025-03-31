/**
 * Utilitário para validação de atualizações de dados do usuário
 */
import { UserInterface } from "../../../types";
import { validationPatterns } from "../regex/validationPatterns";
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } from "../../../constants/validation";

/**
 * Valida os dados de atualização de um usuário
 * @param userData - Dados parciais do usuário para atualização
 * @returns Dados validados ou array de erros
 */
export const validateUpdateData = (userData: Partial<UserInterface>): Partial<UserInterface> | string[] => {
  const errors: string[] = [];

  validateUsername(userData.username, errors);
  validatePassword(userData.password, errors);
  validateEmail(userData.email, errors);

  return errors.length > 0 ? errors : userData;
};

/**
 * Valida o nome de usuário
 */
function validateUsername(username?: string, errors: string[] = []): void {
  if (!username) return;

  if (username.trim() !== username) {
    errors.push("Nome de usuário não pode começar ou terminar com espaço em branco!");
  }

  if (username.length < USERNAME_MIN_LENGTH || username.length > USERNAME_MAX_LENGTH) {
    errors.push(`Nome de usuário deve ter entre ${USERNAME_MIN_LENGTH} e ${USERNAME_MAX_LENGTH} caracteres!`);
  }
}

/**
 * Valida a senha
 */
function validatePassword(password?: string, errors: string[] = []): void {
  if (!password) return;

  if (password.trim() !== password) {
    errors.push("Senha não pode começar ou terminar com espaço em branco!");
  }

  if (password.length < PASSWORD_MIN_LENGTH || password.length > PASSWORD_MAX_LENGTH) {
    errors.push(`Senha deve ter entre ${PASSWORD_MIN_LENGTH} e ${PASSWORD_MAX_LENGTH} caracteres!`);
  }

  const missingConditions: string[] = [];

  if (!validationPatterns.uppercase.test(password)) {
    missingConditions.push("uma letra maiúscula");
  }
  if (!validationPatterns.number.test(password)) {
    missingConditions.push("um número");
  }
  if (!validationPatterns.specialChar.test(password)) {
    missingConditions.push("um caractere especial");
  }

  if (missingConditions.length > 0) {
    errors.push(
      `A senha deve conter pelo menos ${missingConditions.join(", ")}!`
    );
  }
}

/**
 * Valida o email
 */
function validateEmail(email?: string, errors: string[] = []): void {
  if (!email) return;

  if (email.trim() !== email) {
    errors.push("Email não pode começar ou terminar com espaço em branco!");
  }

  if (!validationPatterns.email.test(email)) {
    errors.push("Formato de e-mail inválido!");
  }
}
