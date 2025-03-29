import { Router } from "express";
import {
  authenticateToken,
  isAdmin,
  handleUploadErrors,
} from "../../middleware";
import { adminController, userController } from "../../controllers";
import multiUpload from "../../config/multer/multerConfig";

const router = Router();

router.post(
  "/music/insert",
  authenticateToken,
  isAdmin,
  multiUpload.fields([
    { name: "music", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  handleUploadErrors,
  adminController.insertMusic
);
router.put(
  "/music/edit/:musicId",
  authenticateToken,
  isAdmin,
  multiUpload.fields([{ name: "image", maxCount: 1 }]),
  handleUploadErrors,
  adminController.editMusic
);
router.delete(
  "/music/delete/musicId/:musicId",
  authenticateToken,
  isAdmin,
  adminController.deleteMusicById
);
router.delete(
  "/music/delete/all",
  authenticateToken,
  isAdmin,
  adminController.deleteAllMusics
);

router.get("/users", authenticateToken, isAdmin, adminController.getAllUsers);
router.get(
  "/user/search",
  authenticateToken,
  isAdmin,
  adminController.searchUser
);
router.get("/user/data/:userId", authenticateToken, isAdmin);
router.post(
  "/user/create",
  authenticateToken,
  isAdmin,
  userController.userRegister
);
router.put("/user/edit/:userid", authenticateToken, isAdmin);
router.delete("/user/delete/userId/:userId", authenticateToken, isAdmin);
router.delete("/user/delete/all", authenticateToken, isAdmin);

export const adminRoutes = router;
