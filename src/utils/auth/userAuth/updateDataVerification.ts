import { UserInterface } from "../../../interfaces/userInterface";
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
    errors.push("Username cannot start or end with whitespace!");
  }

  if (username.length < 6 || username.length > 12) {
    errors.push("Username must be between 6 and 12 characters!");
  }
}

function validatePassword(password?: string, errors: string[] = []): void {
  if (!password) return;

  if (password.trim() !== password) {
    errors.push("Password cannot start or end with whitespace!");
  }

  if (password.length < 8 || password.length > 20) {
    errors.push("Password must be between 8 and 20 characters!");
  }

  const missingConditions: string[] = [];

  if (!regex.regexGroup.uppercase.test(password)) {
    missingConditions.push("an uppercase letter");
  }
  if (!regex.regexGroup.number.test(password)) {
    missingConditions.push("a number");
  }
  if (!regex.regexGroup.specialChar.test(password)) {
    missingConditions.push("a special character");
  }

  if (missingConditions.length > 0) {
    errors.push(
      `Password must contain at least ${missingConditions.join(", ")}!`
    );
  }
}

function validateEmail(email?: string, errors: string[] = []): void {
  if (!email) return;

  if (email.trim() !== email) {
    errors.push("Email cannot start or end with whitespace!");
  }

  if (!regex.regexGroup.email.test(email)) {
    errors.push("Invalid email format!");
  }
}
