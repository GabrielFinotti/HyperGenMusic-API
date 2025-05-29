import { minChar, regex, authTokenTemp } from "./const";
import {
  verifyUserData,
  verifyMusicData,
  comparePassword,
  hashPassword,
  createToken,
  revokeToken,
} from "./security";
import { createErrorResponse, createSuccessResponse } from "./response";
import { deleteArchiveForBucket } from "./storage";

export const constants = {
  minChar,
  regex,
  authTokenTemp,
};

export const securityUtils = {
  verifyUserData,
  verifyMusicData,
  hashPassword,
  comparePassword,
  createToken,
  revokeToken,
};

export const responseUtils = {
  createErrorResponse,
  createSuccessResponse,
};

export const storageUtils = {
  deleteArchiveForBucket,
};
