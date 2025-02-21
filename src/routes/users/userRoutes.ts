import { Router } from "express";
import { controllers } from "../../controllers/controllers";
import { authenticateToken } from "../../utils/auth/jwt/tokenVerification";

export const userRoutes = Router();

userRoutes.post("/user/login", controllers.userLogin);
userRoutes.post("/user/register", controllers.userRegister);
userRoutes.get("/profile", authenticateToken);
userRoutes.put("/edit/profile", authenticateToken, controllers.userUpdate);
userRoutes.delete("/delete/profile", authenticateToken);
