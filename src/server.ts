import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes";
import sequelize, {
  initializeDatabase,
} from "./config/database/postgre_config";
export * from "colors";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use("/api", userRouter);

async function startServer() {
  try {
    await initializeDatabase();
    console.log("Database initialization check complete.".cyan);

    await sequelize.authenticate();
    console.log("Database connection established successfully.".green);

    await sequelize.sync();
    console.log("All models were synchronized successfully.".green);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`.green);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
