import { userRegister, userLogin, userUpdate, userDelete, userData } from './user/index';
import { getMusics } from './music/index';

export const userController = {
  userRegister,
  userLogin,
  userUpdate,
  userDelete,
  userData
};

export const musicController = {
  getMusics
};

export const adminController = {};
