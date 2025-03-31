/**
 * Utilitário para validação de dados do usuário
 */
import { UserInterface } from "../../../types";
import { validationPatterns } from "../regex/validationPatterns";
import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } from "../../../constants/validation";

/**
 * Valida os dados de um usuário
 * @param userData - Dados do usuário a serem validados
 * @returns Dados validados ou array de erros
 */
export const validateUserData = (userData: UserInterface): UserInterface | string[] => {
  const errors: string[] = [];

  validateWhitespace(userData, errors);
  validateFieldLengths(userData, errors);
  validatePasswordComplexity(userData.password, errors);
  validateEmailFormat(userData.email, errors);

  if (!userData.role) {
    userData.role = "user";
  }

  return errors.length > 0 ? errors : userData;
};

/**
 * Valida espaços em branco nos campos do usuário
 */
function validateWhitespace(userData: UserInterface, errors: string[]): void {
  if (userData.username.trim() !== userData.username) {
    errors.push("Nome de usuário não pode começar ou terminar com espaço em branco!");
  }

  if (userData.password.trim() !== userData.password) {
    errors.push("Senha não pode começar ou terminar com espaço em branco!");
  }

  if (userData.email.trim() !== userData.email) {
    errors.push("Email não pode começar ou terminar com espaço em branco!");
  }
}

/**
 * Valida o tamanho dos campos do usuário
 */
function validateFieldLengths(userData: UserInterface, errors: string[]): void {
  if (userData.username.length < USERNAME_MIN_LENGTH || userData.username.length > USERNAME_MAX_LENGTH) {
    errors.push(`Nome de usuário deve ter entre ${USERNAME_MIN_LENGTH} e ${USERNAME_MAX_LENGTH} caracteres!`);
  }

  if (userData.password.length < PASSWORD_MIN_LENGTH || userData.password.length > PASSWORD_MAX_LENGTH) {
    errors.push(`Senha deve ter entre ${PASSWORD_MIN_LENGTH} e ${PASSWORD_MAX_LENGTH} caracteres!`);
  }
}

/**
 * Valida a complexidade da senha
 */
function validatePasswordComplexity(password: string, errors: string[]): void {
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
 * Valida o formato do email
 */
function validateEmailFormat(email: string, errors: string[]): void {
  if (!validationPatterns.email.test(email)) {
    errors.push("Formato de e-mail inválido!");
  }
}
