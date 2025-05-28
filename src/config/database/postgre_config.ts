/**
 * Configuração PostgreSQL - HyperMusic API v2.0
 *
 * Configura e inicializa a conexão com o banco de dados PostgreSQL
 * usando Sequelize ORM. Gerencia criação automática do banco de dados
 * e estabelece a instância principal do Sequelize.
 *
 * Funcionalidades:
 * - Inicialização automática do banco de dados
 * - Verificação de existência do banco
 * - Configuração otimizada do Sequelize
 * - Validação de variáveis de ambiente
 *
 * @author HyperMusic Team
 * @version 2.0.0-rc.1
 */
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

// Validação e carregamento de variáveis de ambiente
const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbHost = process.env.DB_HOST as string;
const dbPort = parseInt(process.env.DB_PORT as string);

/**
 * Inicializa o banco de dados PostgreSQL
 *
 * Verifica se o banco de dados existe e o cria automaticamente
 * caso não exista. Utiliza conexão temporária para operações
 * de criação.
 *
 * @throws Erro de conexão ou criação do banco de dados
 */
export async function initializeDatabase() {
  const pgClient = new Client({
    user: dbUser,
    host: dbHost,
    database: "postgres",
    password: dbPassword,
    port: dbPort,
  });

  try {
    await pgClient.connect();
    
    const res = await pgClient.query(
      `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`
    );
    if (res.rowCount === 0) {
      await pgClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
  } catch (error) {
    console.error("Error in database initialization:", error);

    throw error;
  } finally {
    await pgClient.end();
  }
}

/**
 * Instância principal do Sequelize
 *
 * Configurada para PostgreSQL com logging desabilitado
 * para melhor performance em produção.
 */
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  logging: false,
});

export default sequelize;
