import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import "../styles/map.css"

const containerStyle = {
  width: '80%',
  height: '80vh',
};

const defaultCenter = {
  lat: 60.192059,
  lng: 24.945831,
};

const defaultZoom = 12;

const Map = ({ stations, selectedStation }) => {
    return (
      <LoadScript googleMapsApiKey="AIzaSyD3P4XzeXdt2Fb-LObPIBkIW1LAjmR1GCA">
        <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={defaultZoom}>
          {stations.map((station) => {
            const isSelected = selectedStation && selectedStation.ID === station.ID;
            const icon = isSelected
              ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
              : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
  
            return (
              <Marker
                key={station.ID}
                position={{ lat: station.y, lng: station.x }}
                icon={icon}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    );
  };

  export default Map;