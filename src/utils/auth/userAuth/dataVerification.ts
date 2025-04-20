import { UserInterface } from "../../../types";
import { regex } from "../../auth";

export const userDataVerification = (userData: UserInterface) => {
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

function validateWhitespace(userData: UserInterface, errors: string[]): void {
  if (userData.username.trim() !== userData.username) {
    errors.push(
      "Nome de usuário não pode começar ou terminar com espaço em branco!"
    );
  }

  if (userData.password.trim() !== userData.password) {
    errors.push("Senha não pode começar ou terminar com espaço em branco!");
  }

  if (userData.email.trim() !== userData.email) {
    errors.push("Email não pode começar ou terminar com espaço em branco!");
  }
}

function validateFieldLengths(userData: UserInterface, errors: string[]): void {
  if (userData.username.length < 6 || userData.username.length > 12) {
    errors.push("Nome de usuário deve ter entre 6 e 12 caracteres!");
  }

  if (userData.password.length < 8 || userData.password.length > 20) {
    errors.push("Senha deve ter entre 8 e 20 caracteres!");
  }
}

function validatePasswordComplexity(password: string, errors: string[]): void {
  const missingConditions: string[] = [];

  if (!regex.regexGroup.uppercase.test(password)) {
    missingConditions.push("uma letra maiúscula");
  }

  if (!regex.regexGroup.number.test(password)) {
    missingConditions.push("um número");
  }

  if (!regex.regexGroup.specialChar.test(password)) {
    missingConditions.push("um caractere especial");
  }

  if (missingConditions.length > 0) {
    errors.push(
      `A senha deve conter pelo menos ${missingConditions.join(", ")}!`
    );
  }
}

function validateEmailFormat(email: string, errors: string[]): void {
  if (!regex.regexGroup.email.test(email)) {
    errors.push("Formato de e-mail inválido!");
  }
}
