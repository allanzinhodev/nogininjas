import React, { useState, useEffect } from 'react';

function App() {
    const [fighter, setFighter] = useState([]);
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [country, setCountry] = useState('');
    const [age, setAge] = useState('');
    const [team, setTeam] = useState('');
    const [about, setAbout] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/fighters')
            .then(response => response.json())
            .then(data => setFighter(data))
            .catch(error => console.error(error));
    }, []);

    const addFighter = async () => {
        const response = await fetch('http://localhost:3000/fighters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, height, country, age, team, about })
        });
        const newFighter = await response.json();
        setFighter([...fighter, newFighter]);
    };

    return (

        <div>
            <h1>Lista de Lutadores</h1>
            <ul>
                {fighter.map(fighter => (
                    <li key={fighter.name}>
                        {fighter.name} - {fighter.height}cm, {fighter.country}, {fighter.age} anos, {fighter.team}
                        <br />
                        {fighter.about}
                    </li>
                ))}
            </ul>
            <h2>Adicionar Lutador</h2>
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Altura"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            />
            <input
                type="text"
                placeholder="País"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <input
                type="number"
                placeholder="Idade"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <input
                type="text"
                placeholder="Equipe"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
            />
            <textarea
                placeholder="Sobre"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
            />
            <button onClick={addFighter}>Adicionar</button>
        </div>
    );
}

export default App;
