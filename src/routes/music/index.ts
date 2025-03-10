import { Router } from "express";
import { authenticateToken } from "../../middleware";
import { musicController } from "../../controllers";
import { adaptController } from "../../utils/expressAdapter";

const router = Router();

router.get(
  "/musics",
  authenticateToken,
  adaptController(musicController.getMusics)
);

router.get("/music/search");

router.get(
  "/music/data/:id",
  authenticateToken,
  adaptController(musicController.getMusicById)
);

export const musicRoutes = router;
