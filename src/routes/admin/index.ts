import { Router } from "express";
import {
  authenticateToken,
  isAdmin,
  handleUploadErrors,
} from "../../middleware";
import { adminController } from "../../controllers";
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

router.put("/music/edit/:id", authenticateToken, isAdmin);
router.delete("/music/delete/:id", authenticateToken, isAdmin);
router.delete("/music/delete/all", authenticateToken, isAdmin);

router.get("/users", authenticateToken, isAdmin);
router.get("/user/name", authenticateToken, isAdmin);
router.get("/user/data/:id", authenticateToken, isAdmin);
router.post("/user/create", authenticateToken, isAdmin);
router.put("/user/edit/:id", authenticateToken, isAdmin);
router.delete("/user/delete/:id", authenticateToken, isAdmin);
router.delete("/user/delete/all", authenticateToken, isAdmin);

export const adminRoutes = router;
