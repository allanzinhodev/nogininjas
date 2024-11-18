import React from 'react';
import MyNavbar from './MyNavbar';
import FighterFights from './FighterFights';
import FighterDetail from './FighterDetail';
import Footer from './Footer';
import FightersList from './FighterList';

function App() {
    const fighterId = 1;

    return (
        <div>
            <MyNavbar />
            <div className="content">
                <FightersList/>
                <FighterDetail fighterId={fighterId} />
                <FighterFights fighterId={fighterId}/>
            </div>
            <Footer /> 
        </div>
    );
}

export default App;
