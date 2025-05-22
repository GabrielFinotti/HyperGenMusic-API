import { Router } from "express";
import { jwt } from "../middlewares";

const route = Router();

route.get("/admin/users", jwt.verifyToken);
route.get("/admin/user/search", jwt.verifyToken);
route.post("/admin/user/create", jwt.verifyToken);
route.put("/admin/user/update/:id", jwt.verifyToken);
route.delete("/admin/user/delete/:id", jwt.verifyToken);
route.delete("/admin/users/deleteAll", jwt.verifyToken);

route.get("/admin/musics", jwt.verifyToken);
route.get("/admin/musics/search", jwt.verifyToken);
route.post("/admin/music/create", jwt.verifyToken);
route.put("/admin/music/update/:musicId", jwt.verifyToken);
route.delete("/admin/music/delete/:musicId", jwt.verifyToken);
route.delete("/admin/musics/deleteAll", jwt.verifyToken);

export const adminRouter = route;
