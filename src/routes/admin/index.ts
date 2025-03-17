import { Router } from "express";
import { authenticateToken, isAdmin } from "../../middleware";
import { insertMusic } from "../../controllers/admin";

const router = Router();

router.post(
  "/music/insert",
  authenticateToken,
  isAdmin,
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
