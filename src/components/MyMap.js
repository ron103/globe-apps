import React, { Component, useState } from "react";
import countries from "../data/countries.json";
import "leaflet/dist/leaflet.css";
import { MapContainer, GeoJSON } from "react-leaflet";
import "./MyMap.css";
import Dropdown from 'react-bootstrap/Dropdown';



class MyMap extends Component {
  state = { fillColor: "#ffff00", startColor:'#ff0000'};
  
  colors = [
    "red",
    "blue",
    "green",
    "orange",
    "pink",
    "grey",
    "cyan",
    "magenta",
    "yellow",
  ];
  countryStyle = {
    fillColor: this.state.startColor,
    fillOpacity: 0.3,
    color: "black",
    weight: 1,
  };
  changeCountryColor = (event) => {
    event.target.setStyle({
      fillColor: this.state.fillColor,
      fillOpacity: 1,
    });
  };

  changeCountryStyle=(event)=>{
    event.target.setStyle({
      fillColor: this.state.startColor,
    })
  }
  onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName);

    //layer.options.fillColor = this.colors[Math.floor(Math.random()*this.colors.length)];
    layer.options.fillOpacity = Math.random();

    layer.on({
      click: this.changeCountryColor,
    });

    
  };
  colorChange = (event) => {
    this.setState({ fillColor: event.target.value });
  };
  baseColorChange = (event) => {
    this.setState({ startColor: event.target.value })
    console.log('Function called')
  }
  

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Color World Map</h1>
        <MapContainer style={{ height: "80vh" }} zoom={2} center={[20, 100]}>
          <GeoJSON
            style={this.countryStyle}
            data={countries.features}
            onEachFeature={this.onEachCountry}
          />
        </MapContainer>
        <input
          type="color"
          value={this.state.fillColor}
          onChange={this.colorChange}
          style={{margin:'1vh'}}
        />

      </div>
    );
  }
}

export default MyMap;
