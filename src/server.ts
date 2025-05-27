/**
 * Servidor Principal - HyperGenMusic API v2.0
 *
 * Configuração e inicialização do servidor Express com:
 * - Middleware básico (JSON, CORS)
 * - Rotas da API versão 2
 * - Conexão com banco PostgreSQL
 * - Sincronização de modelos Sequelize
 *
 * @author HyperGenMusic Team
 * @version 2.0.0-rc.1
 */
import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter, musicRouter, adminRouter } from "./routes";
import sequelize, {
  initializeDatabase,
} from "./config/database/postgre_config";
export * from "colors";

dotenv.config();

const app = express();

app.use(json());
app.use(cors());

app.use("/api/v2", userRouter, musicRouter, adminRouter);

/**
 * Inicializa o servidor e suas dependências
 *
 * Ordem de inicialização:
 * 1. Verificação do banco de dados
 * 2. Autenticação da conexão
 * 3. Sincronização de modelos
 * 4. Inicialização do servidor HTTP
 */
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
