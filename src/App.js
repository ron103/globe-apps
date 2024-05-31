import React, { useState } from 'react';
import MyMap from './components/MyMap';
import Games from './components/Games';
import PopC from './components/PopC';
import WTC from './components/WTC';



function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  // Function to update the selected game
  const handleGameSelect = (game) => {
    setSelectedGame(game);
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      width: "100vw",
      height: "100vh",
    }}>
      <div style={{ width: "75vw", height: "100%" }}>
        {selectedGame === 'Color World Map' && <MyMap />}
        {selectedGame === 'Population Counter' && <PopC />}
        {selectedGame === 'World Travelled Calculator' && <WTC />}
      </div>
      <div style={{ width: "25vw" }}>
        <Games onGameSelect={handleGameSelect} />
      </div>
    </div>
  );
}

export default App;
