import { verifyToken } from "./jwt";
import { adminAccess } from "./rules";

export const jwt = {
  verifyToken,
};

export const rules = {
  adminAccess,
};
