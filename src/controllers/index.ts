import { userRegister, userLogin, userUpdate, userDelete, userData } from './user/index';
import { getMusics, getMusicById } from './music/index';

export const userController = {
  userRegister,
  userLogin,
  userUpdate,
  userDelete,
  userData
};

export const musicController = {
  getMusics,
  getMusicById
};

export const adminController = {};
