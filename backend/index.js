require("dotenv").config();

const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const alunoRoutes = require("./routes/alunoRoutes");
// password Msct.142205! - mario.carvalho.devpython@gmail.com supabase
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const db = require("./db/db");

// Configuração do CORS atualizada
app.use(
  cors({
    origin: ["https://file-supabase-vercel.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["X-Requested-With", "Content-Type", "Accept"],
    credentials: true,
  })
);

// Rota de teste para verificar se o servidor está funcionando
app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando!" });
});

// Middleware para testar a conexão com o banco antes de usar as rotas
const dbMiddleware = async (req, res, next) => {
  try {
    await db.authenticate();
    next();
  } catch (error) {
    console.error("Erro na conexão com o banco:", error);
    res.status(500).json({ error: "Erro na conexão com o banco de dados" });
  }
};
// Rota para upload de arquivos
app.use("/api/alunos", alunoRoutes);

// Se estiver rodando localmente
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando na porta ${port}`);
  });
}

module.exports = app;
