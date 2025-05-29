import { Router } from "express";
import { jwt } from "../middlewares";
import { playlistController } from "../controllers";

const route = Router();

route.get(
  "/profile/playlists",
  jwt.verifyToken,
  playlistController.getPlaylistUser
);
route.post(
  "/playlist/create",
  jwt.verifyToken,
  playlistController.createPlaylist
);
route.put(
  "/playlist/update",
  jwt.verifyToken,
  playlistController.updatePlaylist
);
route.delete(
  "/playlist/delete",
  jwt.verifyToken,
  playlistController.deletePlaylist
);

route.get(
  "/playlist/:id/musics",
  jwt.verifyToken,
  playlistController.getMusicPlaylist
);
route.post(
  "/playlist/:id/addMusic",
  jwt.verifyToken,
  playlistController.addMusicToPlaylist
);
route.put(
  "/playlist/:id/music/position",
  jwt.verifyToken,
  playlistController.updateMusicPosition
);
route.delete(
  "/playlist/:id/music/delete",
  jwt.verifyToken,
  playlistController.removeMusicFromPlaylist
);

export const playlistRouter = route;
