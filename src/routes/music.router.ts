import { Router } from "express";
import { jwt } from "../middlewares";
import { musicController } from "../controllers";

const route = Router();

route.get("/musics", jwt.verifyToken, musicController.getAllMusic);
route.get(
  "/music/data/:musicId",
  jwt.verifyToken,
  musicController.getMusicData
);
route.get("/musics/genre", jwt.verifyToken, musicController.getMusicGenre);
route.get("/musics/search", jwt.verifyToken, musicController.getMusicTerm);

export const musicRouter = route;
