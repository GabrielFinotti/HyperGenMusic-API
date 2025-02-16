import express, { json } from "express";
import sequelize, { createDatabase } from "./config/database/databaseConfig";
import cors from "cors";
import dotenv from "dotenv";
export * from "colors";
import { routes } from "./routes/routes";

dotenv.config();

const app = express();

app.use(json(), cors({}));

app.use("/api", routes.musicRoutes, routes.adminRoutes, routes.userRoutes);

(async function connectToDatabase() {
  try {
    await createDatabase();

    await sequelize.authenticate();

    console.log("Database connected✅".green.bgBlack);

    app.listen(process.env.PORT, () => {
      console.log(`Server running✅`.green.bgBlack);
    });
  } catch (error) {
    console.error(`Error connecting to database, ${error} ❌`.red.bgBlack);
  }
})();
