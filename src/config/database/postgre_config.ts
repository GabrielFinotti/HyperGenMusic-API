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

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: "postgres",
  logging: false,
});

export default sequelize;
