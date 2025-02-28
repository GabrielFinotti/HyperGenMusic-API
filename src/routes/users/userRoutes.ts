import { Router } from "express";
import { controllers } from "../../controllers/controllers";
import { authenticateToken } from "../../middleware/tokenVerification";

export const userRoutes = Router();

userRoutes.post("/user/login", controllers.userLogin);
userRoutes.post("/user/register", controllers.userRegister);
userRoutes.get("/profile", authenticateToken, controllers.userData);
userRoutes.put("/edit/profile", authenticateToken, controllers.userUpdate);
userRoutes.delete("/delete/profile", authenticateToken, controllers.userDelete);
