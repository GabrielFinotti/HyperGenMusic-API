import { UserInterface } from "../../../interfaces/userInterface";
import regexGroup from "../regex/regexGroup";

export const updateDataVerification = (userData: Partial<UserInterface>) => {
  const missingConditions: string[] = [];
  const errors: string[] = [];

  if (userData.username && userData.username.trim() !== userData.username) {
    errors.push("Username cannot start or end with whitespace!");
  }
  if (userData.password && userData.password.trim() !== userData.password) {
    errors.push("Password cannot start or end with whitespace!");
  }

  if (
    userData.username &&
    (userData.username.length < 6 || userData.username.length > 12)
  ) {
    errors.push("Username must be between 6 and 12 characters!");
  }
  if (
    userData.password &&
    (userData.password.length < 8 || userData.password.length > 20)
  ) {
    errors.push("Password must be between 8 and 20 characters!");
  }

  if (userData.password && !regexGroup.uppercase.test(userData.password)) {
    missingConditions.push("an uppercase letter!");
  }
  if (userData.password && !regexGroup.number.test(userData.password)) {
    missingConditions.push("a number");
  }
  if (userData.password && !regexGroup.specialChar.test(userData.password)) {
    missingConditions.push("a special character!");
  }

  if (missingConditions.length > 0) {
    errors.push(
      `Password must contain at least ${missingConditions.join(", ")}!`
    );
  }

  if (userData.email && userData.email.trim() !== userData.email) {
    errors.push("Email cannot start or end with whitespace!");
  }
  if (userData.email && !regexGroup.email.test(userData.email)) {
    errors.push("Invalid email format!");
  }

  if (errors.length > 0) {
    return errors;
  } else {
    return userData;
  }
};
