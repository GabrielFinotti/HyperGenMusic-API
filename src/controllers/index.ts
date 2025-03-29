import {
  userRegister,
  userLogin,
  userUpdate,
  userDelete,
  userData,
} from "./user";
import {
  createUser,
  deleteAllMusics,
  deleteMusicById,
  editMusic,
  getAllUsers,
  insertMusic,
  searchUser,
} from "./admin";
import { getAllMusics, getMusicData, searchMusics } from "./music";

export const userController = {
  userRegister,
  userLogin,
  userUpdate,
  userDelete,
  userData,
};

export const musicController = {
  getAllMusics,
  getMusicData,
  searchMusics,
};

export const adminController = {
  insertMusic,
  deleteMusicById,
  deleteAllMusics,
  editMusic,
  getAllUsers,
  searchUser,
  createUser,
};
