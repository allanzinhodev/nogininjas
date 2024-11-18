require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // URL do banco na Vercel
  ssl: {
    rejectUnauthorized: false,
  },
});

// Middlewares
app.use(cors());
app.use(express.json());


export default function handler(req, res) {
  res.status(200).json({ message: "Hello from the API!" });
}

// Rotas de exemplo
app.get("/api/fighters", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM fighters");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.get('/fighters/:id/fights', async (req, res) => {
  const { id } = req.params;
  try {
      // Consulta todas as lutas do lutador com o ID especificado
      const result = await pool.query('SELECT * FROM fight WHERE fighter_one = $1 or fighter_two = $1', [id]);
      
      // Se não houver lutas para o lutador, retorna uma mensagem informativa
      if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Nenhuma luta encontrada para este lutador' });
      }

      // Retorna todas as lutas do lutador
      res.status(200).json(result.rows);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
