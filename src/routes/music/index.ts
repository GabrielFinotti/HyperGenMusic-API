import { Router } from "express";
import { authenticateToken } from "../../middleware";
import { musicController } from "../../controllers";

const router = Router();

router.get("/musics", authenticateToken, musicController.getMusics);
router.get("/music/search");
router.get("/music/data/:id", authenticateToken, musicController.getMusicById);

export const musicRoutes = router;
