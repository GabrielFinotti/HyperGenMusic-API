import { Router } from "express";
import { userController } from "../../controllers";
import { authenticateToken } from "../../middleware";
import { adaptController } from "../../utils/expressAdapter";

const router = Router();

router.post("/user/login", adaptController(userController.userLogin));
router.post("/user/register", adaptController(userController.userRegister));
router.get(
  "/profile",
  authenticateToken,
  adaptController(userController.userData)
);
router.put(
  "/edit/profile",
  authenticateToken,
  adaptController(userController.userUpdate)
);
router.delete(
  "/delete/profile",
  authenticateToken,
  adaptController(userController.userDelete)
);

export const userRoutes = router;
