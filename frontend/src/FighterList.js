import React, { useEffect, useState } from 'react';

const FightersList = () => {
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    const fetchFighters = async () => {
      try {
        const response = await fetch('/api/getFighters');
        const data = await response.json();
        setFighters(data);
      } catch (error) {
        console.error('Erro ao buscar lutadores:', error);
      }
    };

    fetchFighters();
  }, []);

  return (
    <div>
      <h1>Fighters</h1>
      <ul>
        {fighters.map((fighter) => (
          <li key={fighter.id}>
            {fighter.name} - {fighter.team}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FightersList;
