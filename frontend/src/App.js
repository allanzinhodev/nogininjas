import React from 'react';
import FighterDetail from './FighterDetail';

function App() {
    const fighterId = 1; // Altere este ID conforme necessário

    return (
        <div>
            <h1>Detalhes do Lutador</h1>
            <FighterDetail fighterId={fighterId} />
        </div>
    );
}

export default App;
