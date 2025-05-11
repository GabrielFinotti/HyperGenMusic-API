import { Router } from "express";
import { userController } from "../controllers";
import { jwt } from "../middlewares";

const route = Router();

route.post("/auth/login", userController.userLogin);
route.post("/auth/register", userController.userRegister);
route.delete("/auth/delete", jwt.verifyToken, userController.userDelete);
route.get("/profile", jwt.verifyToken, userController.getProfile);

export const userRouter = route;
