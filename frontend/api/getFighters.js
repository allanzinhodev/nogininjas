// api/getFighters.js

import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM fighter WHERE id = $1');
    console.log('Query Result:', result.rows);  // Log para verificar os dados retornados
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Database Connection Error:', error);  // Log do erro
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {
    await client.end();
  }
}
