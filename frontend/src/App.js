import React, { useEffect, useState } from "react";
import { fetchFighters } from "./api";

function App() {
  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    fetchFighters().then(setFighters).catch(console.error);
  }, []);

  return (
    <div className="container">
      <h1>Lista de Lutadores</h1>
      <ul>
        {fighters.map((fighter) => (
          <li key={fighter.id}>{fighter.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
