import { Router } from "express";
import { controllers } from "../../controllers/controllers";

export const userRoutes = Router();

userRoutes.post("/user/login", controllers.userLogin);
userRoutes.post("/user/register", controllers.userRegister);
userRoutes.get("/profile");
userRoutes.put("/profile");
userRoutes.delete("/delete/profile");
