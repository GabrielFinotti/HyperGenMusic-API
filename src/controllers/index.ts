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
  adminDeleteUsers,
  adminDeleteAllUser,
  adminGetAllMusics,
  adminGetMusicTerm,
  adminCreateMusic,
  adminUpdateMusic,
  adminDeleteMusic,
  adminDeleteAllMusics,
} from "./admin";
import {
  getLikedMusicUser,
  likeMusic,
  unlikeMusic,
} from "./likedMusic";
import {
  createPlaylist,
  getPlaylistUser,
  updatePlaylist,
  deletePlaylist,
  addMusicToPlaylist,
  getMusicPlaylist,
  updateMusicPosition,
  removeMusicFromPlaylist,
} from "./playlist";

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
  adminDeleteUsers,
  adminDeleteAllUser,
  adminGetAllMusics,
  adminGetMusicTerm,
  adminCreateMusic,
  adminUpdateMusic,
  adminDeleteMusic,
  adminDeleteAllMusics,
};

export const likedMusicController = {
  getLikedMusicUser,
  likeMusic,
  unlikeMusic,
};

export const playlistController = {
  getPlaylistUser,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getMusicPlaylist,
  addMusicToPlaylist,
  updateMusicPosition,
  removeMusicFromPlaylist,
};
