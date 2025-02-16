import { Router } from "express";

export const adminRoutes = Router();

adminRoutes.post("/music/insert");
adminRoutes.put("/music/edit/:id");
adminRoutes.delete("/music/delete/:id");
adminRoutes.delete("/music/delete/all");

adminRoutes.get("/users");
adminRoutes.get("/user/name");
adminRoutes.get("/user/data/:id");
adminRoutes.post("/user/create");
adminRoutes.put("/user/edit/:id");
adminRoutes.delete("/user/delete/:id");
adminRoutes.delete("/user/delete/all");
