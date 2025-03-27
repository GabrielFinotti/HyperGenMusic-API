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
  insertMusic,
} from "./admin";
import { getAllMusics, getMusicData } from "./music";

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
};

export const adminController = {
  insertMusic,
  deleteMusicById,
  deleteAllMusics,
  editMusic,
};
