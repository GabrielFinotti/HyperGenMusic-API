import express, { json } from "express";
import sequelize, { createDatabase } from "./config/database/databaseConfig";
import redisClient from "./config/redis/redisConfig";
import { musicRoutes, adminRoutes, userRoutes } from "./routes";
import cors from "cors";
import dotenv from "dotenv";
import { folderUtils } from "./utils";
import path from "path";
export * from "colors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(json());
app.use(cors());

const uploadDir = path.resolve(__dirname, "..", "src", "uploads");
app.use("/uploads/images", express.static(path.join(uploadDir, "images")));
app.use("/uploads/music", express.static(path.join(uploadDir, "music")));

app.use("/api", musicRoutes, adminRoutes, userRoutes);

const startServer = async () => {
  try {
    console.log(`Inicializando servidor...`.cyan.bgBlack);

    await createDatabase();

    await folderUtils.setupUploadDirectories();
    console.log(`Diretórios de upload criados`.green.bgBlack);

    await redisClient.ping();
    console.log(`Conexão com Redis estabelecida`.green.bgBlack);

    await sequelize.authenticate();
    console.log("Banco de dados conectado!".green.bgBlack);

    await sequelize.sync({ alter: true });
    console.log("Banco de dados sincronizado!".green.bgBlack);

    app.listen(PORT, () => {
      console.log(`Servidor em execução na porta ${PORT}!`.green.bgBlack);
    });
  } catch (error) {
    console.error(
      `Erro durante a inicialização do servidor: ${error}`.red.bgBlack
    );

    process.exit(1);
  }
};

startServer();
