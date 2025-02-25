import { Router } from "express";
import { authenticateToken } from "../../utils/auth/jwt/tokenVerification";
import { controllers } from "../../controllers/controllers";

export const musicRoutes = Router();

musicRoutes.get("/musics", authenticateToken, controllers.getMusics);
musicRoutes.get("/music/search");
musicRoutes.get("/music/data/:id");
