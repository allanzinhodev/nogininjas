require('dotenv').config(); // Carregar as variáveis do .env

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS, // A senha deve ser uma string
    port: process.env.DB_PORT,
});

module.exports = pool;
