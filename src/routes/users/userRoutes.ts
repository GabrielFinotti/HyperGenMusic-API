import { Router } from "express";

export const userRoutes = Router();

userRoutes.get("/profile");
userRoutes.post("/user/login");
userRoutes.post("/user/register");
userRoutes.put("/profile");
userRoutes.delete("/delete/profile");
