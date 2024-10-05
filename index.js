const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// CRUD para fighters

// Criar fighter
app.post('/fighters', async (req, res) => {
    const { name, height, country, age, team, about } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO fighter (name, height, country, age, team, about) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, height, country, age, team, about]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ler todos os fighters
app.get('/fighters', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM fighter');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Atualizar fighter
app.put('/fighters/:name', async (req, res) => {
    const { name } = req.params;
    const { height, country, age, team, about } = req.body;
    try {
        const result = await pool.query(
            'UPDATE fighter SET height = $1, country = $2, age = $3, team = $4, about = $5 WHERE name = $6 RETURNING *',
            [height, country, age, team, about, name]
        );
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deletar fighter
app.delete('/fighters/:name', async (req, res) => {
    const { name } = req.params;
    try {
        await pool.query('DELETE FROM fighter WHERE name = $1', [name]);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});