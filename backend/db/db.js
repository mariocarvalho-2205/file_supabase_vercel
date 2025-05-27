const { Sequelize } = require('sequelize')
// senha = Msct.142205!

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    host: 'localhost'
})
try {
  db.authenticate();
  console.log('Conexão com o banco de dados foi bem-sucedida.');
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error);
}

module.exports = db

