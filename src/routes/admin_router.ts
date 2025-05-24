import { Router } from "express";
import { jwt, rules } from "../middlewares";
import { adminController } from "../controllers";

const route = Router();

route.get(
  "/admin/users",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminGetAllUsers
);
route.get(
  "/admin/users/search",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminGetUsersTerm
);
route.post(
  "/admin/user/create",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminCreateUser
);
route.put(
  "/admin/user/update/:id",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminUpdateUser
);
route.delete(
  "/admin/user/delete/:id",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminDeleteUser
);
route.delete(
  "/admin/users/deleteAll",
  jwt.verifyToken,
  rules.adminAccess,
  adminController.adminDeleteAllUser
);

route.get("/admin/musics", jwt.verifyToken, rules.adminAccess);
route.get("/admin/musics/search", jwt.verifyToken, rules.adminAccess);
route.post("/admin/music/create", jwt.verifyToken, rules.adminAccess);
route.put("/admin/music/update/:musicId", jwt.verifyToken, rules.adminAccess);
route.delete(
  "/admin/music/delete/:musicId",
  jwt.verifyToken,
  rules.adminAccess
);
route.delete("/admin/musics/deleteAll", jwt.verifyToken, rules.adminAccess);

export const adminRouter = route;
