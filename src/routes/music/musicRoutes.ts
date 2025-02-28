import { Router } from "express";
import { authenticateToken } from "../../middleware/tokenVerification";
import { controllers } from "../../controllers/controllers";

export const musicRoutes = Router();

musicRoutes.get("/musics", authenticateToken, controllers.getMusics);
musicRoutes.get("/music/search");
musicRoutes.get("/music/data/:id");
