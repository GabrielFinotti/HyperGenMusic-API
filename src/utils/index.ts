import { jwt, regex, userAuth } from "./auth/index";
import deleteFileIfExists from "./uploads/deleteFileIfExists";
import setupUploadDirectories, {
  cleanUploadDirectories,
} from "./uploads/folderSync";
import getFileExtension, { mimeTypes } from "./uploads/getFileExtension";
import { getUserData, userDataUpdate } from "./user/index";

export const authUtils = {
  jwt,
  regex,
  userAuth,
};

export const userUtils = {
  getUserData,
  userDataUpdate,
};

export const folderUtils = {
  setupUploadDirectories,
  cleanUploadDirectories,
  getFileExtension,
  deleteFileIfExists,
  mimeTypes,
};
