/**
 * Configuração Redis - HyperMusic API v2.0
 *
 * Configura e inicializa a conexão com o servidor Redis
 * para cache e armazenamento temporário de dados, incluindo
 * tokens JWT revogados e sessões de usuário.
 *
 * Funcionalidades:
 * - Conexão configurada via variável de ambiente
 * - Logs coloridos para status de conexão
 * - Tratamento de erros de conexão
 * - Cliente singleton para toda a aplicação
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

/**
 * Cliente Redis principal da aplicação
 *
 * Utiliza configuração de URL completa do ambiente para
 * flexibilidade em diferentes ambientes (dev, prod, test).
 */
const redisClient = new Redis(process.env.REDIS_URL as string);

// Event listeners para monitoramento da conexão
redisClient.on("connect", () => {
  console.log("Redis Client Connected".green.bgBlack);
});

redisClient.on("error", (err) => {
  console.error(`Redis Client Error: ${err}`.red.bgBlack);
});

export default redisClient;
