import { Router } from "express";
import { userController } from "../controllers";

const route = Router();

route.post("/auth/login", userController.userLogin);
route.post("/auth/register", userController.userRegister);

export const userRouter = route;
