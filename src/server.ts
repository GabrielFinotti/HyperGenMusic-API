import sequelize from './infrastructure/database';

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso.');

    await sequelize.sync({ alter: true });
    console.log('Todos os modelos foram sincronizados com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

startServer();
