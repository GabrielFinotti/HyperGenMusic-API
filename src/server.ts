import express, { json } from "express";
import sequelize, { createDatabase } from "./config/database/databaseConfig";
import cors from "cors";
import dotenv from "dotenv";
export * from "colors";
import { routes } from "./routes/routes";

dotenv.config();

const app = express();

app.use(json(), cors({}));

app.listen(process.env.PORT, async () => {
  try {
    console.log(`Server running!`.green.bgBlack);

    await createDatabase();

    await sequelize.authenticate();
    console.log("Database connected!".green.bgBlack);

    await sequelize.sync({alter: true});
    console.log("Database synchronized!".green.bgBlack);

    app.use("/api", routes.musicRoutes, routes.adminRoutes, routes.userRoutes);
  } catch (error) {
    console.error(`Error connecting to database, ${error} !`.red.bgBlack);
  }
});
