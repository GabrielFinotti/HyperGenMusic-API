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
    console.log(`Servidor em execução!`.green.bgBlack);

    await createDatabase();

    await redisClient.ping();

    await sequelize.authenticate();
    console.log("Banco de dados conectado!".green.bgBlack);

    await sequelize.sync({ alter: true });
    console.log("Banco de dados sincronizado!".green.bgBlack);

    app.use("/api", musicRoutes, adminRoutes, userRoutes);
  } catch (error) {
    console.error(`Erro durante a inicialização do servidor: ${error}`.red.bgBlack);
  }
});
