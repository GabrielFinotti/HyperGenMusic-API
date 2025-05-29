import { Router } from "express";
import { userController } from "../controllers";
import { jwt } from "../middlewares";
import multer from "../config/archives/multer_config";

const route = Router();

route.post("/auth/login", userController.userLogin);

route.post("/auth/register", userController.userRegister);

route.delete("/auth/delete", jwt.verifyToken, userController.userDelete);

route.get("/profile", jwt.verifyToken, userController.getProfile);

route.put(
  "/profile/update",
  jwt.verifyToken,
  multer.single("image"),
  userController.userUpdate
);

export const userRouter = route;
