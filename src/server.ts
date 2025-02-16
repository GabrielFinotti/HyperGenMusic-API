import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
export * from "colors";
import { routes } from "./routes/routes";

dotenv.config();

const app = express();

app.use(json(), cors({}));

app.listen(process.env.PORT, async () => {
  try {
    console.log(`Server running✅`.green.bgBlack);

    app.use("/api", routes.musicRoutes, routes.adminRoutes, routes.userRoutes);
  } catch (error) {
    console.error(error);
  }
});
