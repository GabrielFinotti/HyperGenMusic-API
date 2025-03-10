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
router.get("/music/data/:id");

export const musicRoutes = router;
