import { Sequelize } from "sequelize";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const createDatabase = async () => {
  try {
    const client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: "postgres",
    });

    await client.connect();

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [process.env.DB_NAME]
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log(
        `Database ${process.env.DB_NAME} created successfully!`.green.bgBlack
      );
    } else {
      console.log(
        `Database ${process.env.DB_NAME} already exists!`.yellow.bgBlack
      );
    }

    await client.end();
  } catch (error) {
    console.error(`Error creating the database: ${error}`.red.bgBlack);
  }
};

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: Number(process.env.DB_PORT),
    logging: false,
  }
);

export default sequelize;
