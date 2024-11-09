const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = 5432;

app.use(cors());
app.use(bodyParser.json());

// Endpoint para selecionar um único fighter pelo ID
app.get('/fighters/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM fighter WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Lutador não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para buscar todas as lutas de um lutador pelo ID
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


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
