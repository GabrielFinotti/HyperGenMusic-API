import { generateToken, deleteToken } from "./jwt/index";
import { regexGroup } from "./regex/index";
import { userDataVerification, updateDataVerification } from "./userAuth/index";

export const jwt = {
  generateToken,
  deleteToken,
};

export const regex = {
  regexGroup,
};

export const userAuth = {
  userDataVerification,
  updateDataVerification,
};
