import { UserInterface } from "../../../types";
import { regex } from "../../auth";

export const updateDataVerification = (userData: Partial<UserInterface>) => {
  const errors: string[] = [];

  validateUsername(userData.username, errors);
  validatePassword(userData.password, errors);
  validateEmail(userData.email, errors);

  return errors.length > 0 ? errors : userData;
};

function validateUsername(username?: string, errors: string[] = []): void {
  if (!username) return;

  if (username.trim() !== username) {
    errors.push("Nome de usuário não pode começar ou terminar com espaço em branco!");
  }

  if (username.length < 6 || username.length > 12) {
    errors.push("Nome de usuário deve ter entre 6 e 12 caracteres!");
  }
}

function validatePassword(password?: string, errors: string[] = []): void {
  if (!password) return;

  if (password.trim() !== password) {
    errors.push("Senha não pode começar ou terminar com espaço em branco!");
  }

  if (password.length < 8 || password.length > 20) {
    errors.push("Senha deve ter entre 8 e 20 caracteres!");
  }

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

function validateEmail(email?: string, errors: string[] = []): void {
  if (!email) return;

  if (email.trim() !== email) {
    errors.push("Email não pode começar ou terminar com espaço em branco!");
  }

  if (!regex.regexGroup.email.test(email)) {
    errors.push("Formato de e-mail inválido!");
  }
}
