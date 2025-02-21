import { UserInterface } from "../../../interfaces/userInterface";
import regexGroup from "../regex/regexGroup";

export const userDataVerification = (userData: UserInterface) => {
  const missingConditions: string[] = [];
  const errors: string[] = [];

  if (userData.username.trim() !== userData.username) {
    errors.push("Username cannot start or end with whitespace!");
  }
  if (userData.password.trim() !== userData.password) {
    errors.push("Password cannot start or end with whitespace!");
  }

  if (userData.username.length < 6 || userData.username.length > 12) {
    errors.push("Username must be between 6 and 12 characters!");
  }
  if (userData.password.length < 8 || userData.password.length > 20) {
    errors.push("Password must be between 8 and 20 characters!");
  }

  if (!regexGroup.uppercase.test(userData.password)) {
    missingConditions.push("an uppercase letter!");
  }
  if (!regexGroup.number.test(userData.password)) {
    missingConditions.push("a number");
  }
  if (!regexGroup.specialChar.test(userData.password)) {
    missingConditions.push("a special character!");
  }

  if (missingConditions.length > 0) {
    errors.push(
      `Password must contain at least ${missingConditions.join(", ")}!`
    );
  }

  if (userData.email.trim() !== userData.email) {
    errors.push("Email cannot start or end with whitespace!");
  }
  if (!regexGroup.email.test(userData.email)) {
    errors.push("Invalid email format!");
  }

  if (!userData.role) {
    userData.role = "user";
  }

  if (errors.length > 0) {
    return errors;
  } else {
    return userData;
  }
};
