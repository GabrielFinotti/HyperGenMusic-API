import { Router } from "express";
import { jwt } from "../middlewares";
import { likedMusicController } from "../controllers";

const route = Router();

route.get(
  "/profile/musics/liked",
  jwt.verifyToken,
  likedMusicController.getLikedMusicUser
);
route.post("/music/like", jwt.verifyToken, likedMusicController.likeMusic);
route.delete(
  "/music/unlike",
  jwt.verifyToken,
  likedMusicController.unlikeMusic
);

export const likedMusicRouter = route;
