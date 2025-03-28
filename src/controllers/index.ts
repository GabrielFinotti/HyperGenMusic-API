import {
  userRegister,
  userLogin,
  userUpdate,
  userDelete,
  userData,
} from "./user";
import {
  deleteAllMusics,
  deleteMusicById,
  editMusic,
  getAllUsers,
  insertMusic,
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
};
