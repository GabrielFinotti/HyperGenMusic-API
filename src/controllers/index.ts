import {
  userLogin,
  userRegister,
  userDelete,
  getProfile,
  userUpdate,
} from "./user";
import {
  getMusicData,
  getAllMusic,
  getMusicGenre,
  getMusicTerm,
} from "./music";

export const userController = {
  userLogin,
  userRegister,
  userDelete,
  getProfile,
  userUpdate,
};

export const musicController = {
  getMusicData,
  getAllMusic,
  getMusicGenre,
  getMusicTerm,
};
