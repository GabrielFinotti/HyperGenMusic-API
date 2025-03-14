import { Router } from "express";
import { authenticateToken } from "../../middleware";
import { insertMusic } from "../../controllers/admin";
import multerConfig from "../../config/multer";

const router = Router();

router.post(
  "/music/insert",
  authenticateToken,
  multerConfig.fields([
    { name: "music", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  insertMusic
);

router.put("/music/edit/:id");
router.delete("/music/delete/:id");
router.delete("/music/delete/all");

router.get("/users");
router.get("/user/name");
router.get("/user/data/:id");
router.post("/user/create");
router.put("/user/edit/:id");
router.delete("/user/delete/:id");
router.delete("/user/delete/all");

export const adminRoutes = router;
