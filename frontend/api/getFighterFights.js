import { Client } from 'pg';

export default function handler(req, res) {
  // Adicionando cabeçalhos de CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todas as origens
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Permite métodos específicos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Permite cabeçalhos específicos

  // Resolvendo requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Sua lógica principal
  res.status(200).json({ message: 'Lutas do lutador' });
}


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
      `SELECT * FROM fight WHERE fighter_one = $1 OR fighter_two = $1`,
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
