import { UserInterface } from "../../../interfaces/userInterface";
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
    errors.push("Username cannot start or end with whitespace!");
  }

  if (userData.password.trim() !== userData.password) {
    errors.push("Password cannot start or end with whitespace!");
  }

  if (userData.email.trim() !== userData.email) {
    errors.push("Email cannot start or end with whitespace!");
  }
}

function validateFieldLengths(userData: UserInterface, errors: string[]): void {
  if (userData.username.length < 6 || userData.username.length > 12) {
    errors.push("Username must be between 6 and 12 characters!");
  }

  if (userData.password.length < 8 || userData.password.length > 20) {
    errors.push("Password must be between 8 and 20 characters!");
  }
}

function validatePasswordComplexity(password: string, errors: string[]): void {
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

function validateEmailFormat(email: string, errors: string[]): void {
  if (!regex.regexGroup.email.test(email)) {
    errors.push("Invalid email format!");
  }
}
