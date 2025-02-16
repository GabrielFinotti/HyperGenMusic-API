import { Router } from "express";

export const musicRoutes = Router();

musicRoutes.get("/musics");
musicRoutes.get("/music/search");
musicRoutes.get("/music/data/:id");
