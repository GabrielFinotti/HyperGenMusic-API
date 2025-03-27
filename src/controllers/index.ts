import {
  userRegister,
  userLogin,
  userUpdate,
  userDelete,
  userData,
} from "./user/index";
import { getMusics, getMusicById } from "./music/index";
import {
  deleteAllMusics,
  deleteMusicById,
  editMusic,
  insertMusic,
} from "./admin/index";

export const userController = {
  userRegister,
  userLogin,
  userUpdate,
  userDelete,
  userData,
};

export const musicController = {
  getMusics,
  getMusicById,
};

export const adminController = {
  insertMusic,
  deleteMusicById,
  deleteAllMusics,
  editMusic,
};
