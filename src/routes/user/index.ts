import { Router } from "express";
import { userController } from "../../controllers";
import { authenticateToken } from "../../middleware";

const router = Router();

router.post("/user/login", userController.userLogin);
router.post("/user/register", userController.userRegister);
router.get("/profile", authenticateToken, userController.userData);
router.put("/edit/profile", authenticateToken, userController.userUpdate);
router.delete("/delete/profile", authenticateToken, userController.userDelete);

export const userRoutes = router;
