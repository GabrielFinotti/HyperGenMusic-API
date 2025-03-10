import express, { json } from "express";
import sequelize, { createDatabase } from "./config/database/databaseConfig";
import redisClient from "./config/redis/redisConfig";
import { musicRoutes, adminRoutes, userRoutes } from "./routes";
import cors from "cors";
import dotenv from "dotenv";
export * from "colors";

dotenv.config();

const app = express();

app.use(json(), cors({}));

app.listen(process.env.PORT, async () => {
  try {
    console.log(`Server running!`.green.bgBlack);

    await createDatabase();

    await redisClient.ping();

    await sequelize.authenticate();
    console.log("Database connected!".green.bgBlack);

    await sequelize.sync({ alter: true });
    console.log("Database synchronized!".green.bgBlack);

    app.use("/api", musicRoutes, adminRoutes, userRoutes);
  } catch (error) {
    console.error(`Error during server initialization: ${error}`.red.bgBlack);
  }
});
