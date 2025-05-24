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

import {
  adminGetAllUsers,
  adminGetUsersTerm,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUser,
  adminDeleteAllUser,
} from "./admin";

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

export const adminController = {
  adminGetAllUsers,
  adminGetUsersTerm,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUser,
  adminDeleteAllUser,
};
