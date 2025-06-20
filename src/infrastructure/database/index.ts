import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { UserModel } from './models/user.model';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_PORT) {
  throw new Error('Por favor, defina as variáveis de ambiente no arquivo .env');
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  logging: false,
});

const models = [UserModel];

models.forEach((model) => model.initialize(sequelize));

export default sequelize;
