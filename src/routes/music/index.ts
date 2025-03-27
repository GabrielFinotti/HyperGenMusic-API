import { Router } from "express";
import { authenticateToken } from "../../middleware";
import { musicController } from "../../controllers";

const router = Router();

router.get("/musics", authenticateToken, musicController.getAllMusics);
router.get("/music/search", authenticateToken, musicController.searchMusics);
router.get(
  "/music/data/:musicId",
  authenticateToken,
  musicController.getMusicData
);

export const musicRoutes = router;
