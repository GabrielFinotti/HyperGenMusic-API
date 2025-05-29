import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "colors";
import {
  userRouter,
  musicRouter,
  adminRouter,
  playlistRouter,
  likedMusicRouter,
} from "./routes";
import sequelize, {
  initializeDatabase,
} from "./config/database/postgre_config";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use(
  "/api/v2",
  userRouter,
  musicRouter,
  adminRouter,
  playlistRouter,
  likedMusicRouter
);

async function startServer() {
  try {
    await initializeDatabase();
    console.log("Database initialization check complete.".cyan);

    await sequelize.authenticate();
    console.log("Database connection established successfully.".green);

    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.".green);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`.green);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
