import { Router } from "express";
import { jwt } from "../middlewares";
import { playlistController } from "../controllers";

const route = Router();

route.get("/playlists", jwt.verifyToken, playlistController.getPlaylistUser);
route.post(
  "/playlist/create",
  jwt.verifyToken,
  playlistController.createPlaylist
);
route.put(
  "/playlist/update/:playlistId",
  jwt.verifyToken,
  playlistController.updatePlaylist
);
route.delete(
  "/playlist/delete/:playlistId",
  jwt.verifyToken,
  playlistController.deletePlaylist
);

route.get(
  "/playlist/:playlistId/musics",
  jwt.verifyToken,
  playlistController.getMusicPlaylist
);
route.post(
  "/playlist/:playlistId/music/create",
  jwt.verifyToken,
  playlistController.addMusicToPlaylist
);
route.put(
  "/playlist/:playlistId/music/position",
  jwt.verifyToken,
  playlistController.updateMusicPosition
);
route.delete(
  "/playlist/:playlistId/music/delete",
  jwt.verifyToken,
  playlistController.removeMusicFromPlaylist
);

export const playlistRouter = route;
