import React from 'react';
import './Games.css';
import colorMapImg from '../data/img/colorMap.png';
import popDenImg from '../data/img/popDen.png'
import comingSoon from '../data/img/comingsoon.png'


function Games({ onGameSelect }) {
  return (
    <div className='primary-div' style={{ display: "flex", flexDirection: "column", padding:'1vh', gap:'3vh'}}>
        <h3>Which Game Do You Want to Play?</h3>
        
        <div className='games' onClick={() => onGameSelect('Color World Map')}>
            <img src={colorMapImg} style={{maxWidth:'100px'}} />
            Color World Map
        </div>
        <div className='games' onClick={() => onGameSelect('Population Counter')}>
            <img src={popDenImg} style={{maxWidth:'100px'}} />
            Population Counter
        </div>
        <h3>Coming soon</h3>
        <div className='games' onClick={() => onGameSelect('World Travelled Calculator')}>
            <img src={comingSoon} style={{maxWidth:'100px'}} />
            World Travelled Calculator
        </div>
    </div>
  )
}

export default Games;
