import { jwt, regex, userAuth } from "./auth/index";
import { responseHandling } from "./handlings";
import {
  setupUploadDirectories,
  cleanUploadDirectories,
  getFileExtension,
  deleteFileIfExists,
  replaceImage,
  mimeTypes,
} from "./uploads/index";

export const authUtils = {
  jwt,
  regex,
  userAuth,
};

export const folderUtils = {
  setupUploadDirectories,
  cleanUploadDirectories,
  getFileExtension,
  deleteFileIfExists,
  replaceImage,
  mimeTypes,
};

export const handlingUtils = {
  responseHandling,
};
