import { Client } from 'pg';

export default async function handler(req, res) {
  const { id } = req.query; // Pegando o ID do lutador da query string

  // Verifique se o 'id' foi passado
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Certifique-se de que a variável está configurada no Vercel
  });

  try {
    await client.connect();

    // Consulta todas as lutas onde o lutador aparece como fighter_one ou fighter_two
    const result = await client.query(
      `SELECT * FROM fights WHERE fighter_one = $1 OR fighter_two = $1`,
      [id]
    );

    // Verifique se há lutas
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No fights found for this fighter' });
    }

    res.status(200).json(result.rows); // Retorna as lutas encontradas
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {
    await client.end();
  }
}
