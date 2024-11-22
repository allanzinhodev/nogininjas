import React, { useState, useEffect } from 'react';

const FighterFights = ({ fighterIds }) => {
  const [fighters, setFighters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFighterData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fazendo requisições para cada ID individualmente
        const fighterPromises = fighterIds.map(async (id) => {
          const response = await fetch(`/fighter/${id}`); // Endpoint individual por ID
          if (!response.ok) {
            throw new Error(`Erro ao buscar o lutador com ID ${id}`);
          }
          return await response.json();
        });

        // Aguardando todas as promessas serem resolvidas
        const fighterData = await Promise.all(fighterPromises);
        setFighters(fighterData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (fighterIds.length > 0) {
      fetchFighterData();
    }
  }, [fighterIds]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h2>Fighters</h2>
      <ul>
        {fighters.map((fighter) => (
          <li key={fighter.id}>
            <strong>{fighter.name}</strong> - {fighter.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FighterFights;
