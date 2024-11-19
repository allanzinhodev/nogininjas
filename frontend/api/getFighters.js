import { Client } from 'pg';

export default async function handler(req, res) {
  const { id } = req.query; // Pegando o 'id' da URL (query parameter)

  // Verifica se o 'id' foi passado
  if (!id) {
    return res.status(400).json({ error: 'ID is required' }); // Retorna erro caso não haja id
  }

  // Converte o 'id' em uma lista, caso seja uma string separada por vírgulas
  const ids = id.split(',').map((id) => id.trim());

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    // Cria os placeholders dinamicamente para a query ($1, $2, $3...)
    const placeholders = ids.map((_, index) => `$${index + 1}`).join(', ');

    // Query para buscar lutadores pelos IDs
    const query = `SELECT * FROM fighter WHERE id IN (${placeholders})`;
    const result = await client.query(query, ids);

    // Verifica se encontrou algum lutador
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No fighters found' }); // Retorna erro se não encontrar
    }

    console.log('Query Result:', result.rows); // Log para verificar os dados retornados
    res.status(200).json(result.rows); // Retorna todos os lutadores encontrados

  } catch (error) {
    console.error('Database Connection Error:', error); // Log do erro
    res.status(500).json({ error: 'Failed to fetch data' });
  } finally {
    await client.end();
  }
}
