const { Sequelize } = require("sequelize");
const pg = require("pg");
// senha = Msct.142205!

let config = {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
};

// Configuração específica para produção (Supabase)
if (process.env.NODE_ENV === "production") {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL não está definida para produção");
  }

  // Opcional: Configuração específica do Supabase
  if (process.env.SUPABASE_URL) {
    config.dialectOptions.connection = {
      options: `project=${process.env.SUPABASE_URL.split("/").pop()}`
    };
  }
}

// Conexão com o banco de dados
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/dbname",
  config
);

module.exports = db;
