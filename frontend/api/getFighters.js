// api/getFighters.js
import { Client } from 'pg';

export default async function handler(req, res) {
  const { id } = req.query;  // Pegando o 'id' da URL (query parameter)
  
  // Verifique se o 'id' foi passado
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });  // Retorna erro caso não haja id
  }
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    
    // Query para buscar o lutador pelo ID
    const result = await client.query('SELECT * FROM fighter WHERE id = $1', [id]);
    
    // Verifica se o lutador foi encontrado
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Fighter not found' });  // Retorna erro se não encontrar
    }
    console.log('Query Result:', result.rows);  // Log para verificar os dados retornados
    res.status(200).json(result.rows[0]);  // Retorna o primeiro lutador encontrado
  } catch (error) {
    console.error('Database Connection Error:', error);  // Log do erro
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {
    await client.end();
  }
}