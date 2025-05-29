import { Router } from "express";
import { jwt } from "../middlewares";
import { likedMusicController } from "../controllers";

const route = Router();

route.get(
  "/favorites",
  jwt.verifyToken,
  likedMusicController.getLikedMusicUser
);
route.post(
  "/favorites/create",
  jwt.verifyToken,
  likedMusicController.likeMusic
);
route.delete(
  "/favorites/delete",
  jwt.verifyToken,
  likedMusicController.unlikeMusic
);

export const likedMusicRouter = route;
