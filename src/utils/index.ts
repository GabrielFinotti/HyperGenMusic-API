import { jwt, regex, userAuth } from "./auth/index";
import setupUploadDirectories, {
  checkUploadDirectories,
  cleanUploadDirectories,
} from "./uploads/folderSync";
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
  checkUploadDirectories,
};
