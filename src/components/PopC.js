import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import popden from '../data/popden.json';
import '../components/PopC.css';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const icon = new L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

const position = [51.505, -0.09];

function ResetCenterView({ selectPosition }) {
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(
        L.latLng(selectPosition.lat, selectPosition.lon),
        map.getZoom(),
        { animate: true }
      );
    }
  }, [selectPosition, map]);

  return null;
}

function SearchBox({ setSelectPosition, setRadius }) {
  const [searchText, setSearchText] = useState('');
  const [listPlace, setListPlace] = useState([]);
  const [inputRadius, setInputRadius] = useState(1000);

  const searchLocation = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    fetch(`${NOMINATIM_BASE_URL}${queryString}`)
      .then(response => response.json())
      .then(result => {
        setListPlace(result);
      })
      .catch(err => console.error("Error:", err));
  };

  return (
    <div>
      <input
        type="text"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <button onClick={searchLocation}>Search</button>
      <input
        type="number"
        value={inputRadius}
        onChange={e => setInputRadius(e.target.value)}
      />
      <button onClick={() => setRadius(Number(inputRadius))}>Set Radius</button>
      <ul>
        {listPlace.map(item => (

          <div className='loc-search' key={item.place_id} onClick={() => setSelectPosition(item)}>
            {item.display_name}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default function MapsApp() {
  const [selectPosition, setSelectPosition] = useState(null);
  const [radius, setRadius] = useState(1000);
  const [population, setPopulation] = useState(null);

  useEffect(() => {
    if (selectPosition && selectPosition.address) {
      const country = selectPosition.address.country;
      console.log(selectPosition.boundingbox)
      popden.forEach(c => {
        if (c.country === country) {
          const density = c.density;
          const area = Math.PI * Math.pow(radius / 1000, 2); // Convert radius to kilometers and compute area
          const calculatedPopulation = area * density;
          setPopulation(Math.floor(calculatedPopulation)); // Fix the population to zero decimal places
          console.log(`Population is ${Math.floor(calculatedPopulation)} within radius ${radius} meters.`);
        }
      });
    }
  }, [selectPosition, radius]);
  

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Population Counter</h1>
      <div>
      <SearchBox setSelectPosition={setSelectPosition} setRadius={setRadius} />
      </div>
      <MapContainer center={position} zoom={13} style={{ height: "80vh" }}>
      
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=h0XmSv8g9epzGUwPr3eT"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectPosition && (
          <>
            <Circle center={[selectPosition.lat, selectPosition.lon]} radius={radius} color="red">
              <Popup>
                The population inside this {Math.floor(Math.PI * Math.pow(radius / 1000, 2))} KmSq circle at {selectPosition.display_name} is {population}
              </Popup>
            </Circle>
          </>
        )}
        
        <ResetCenterView selectPosition={selectPosition} />

        
   
      </MapContainer>
      
    </div>
  );
}
