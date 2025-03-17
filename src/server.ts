import express, { json } from "express";
import sequelize, { createDatabase } from "./config/database/databaseConfig";
import redisClient from "./config/redis/redisConfig";
import { musicRoutes, adminRoutes, userRoutes } from "./routes";
import cors from "cors";
import dotenv from "dotenv";
export * from "colors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(json());
app.use(cors({}));

// Configuração das rotas
app.use("/api", musicRoutes, adminRoutes, userRoutes);

// Inicialização do servidor
const startServer = async () => {
  try {
    console.log(`Inicializando servidor...`.blue.bgBlack);

    // Criar banco de dados se não existir
    await createDatabase();

    // Verificar conexão com Redis
    await redisClient.ping();
    console.log(`Conexão com Redis estabelecida`.green.bgBlack);

    // Conectar ao banco de dados
    await sequelize.authenticate();
    console.log("Banco de dados conectado!".green.bgBlack);

    // Sincronizar modelos com o banco de dados
    await sequelize.sync({ alter: true });
    console.log("Banco de dados sincronizado!".green.bgBlack);

    // Iniciar servidor HTTP
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

// Iniciar servidor
startServer();
