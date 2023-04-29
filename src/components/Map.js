import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '80vh',
};

const defaultCenter = {
  lat: 60.192059,
  lng: 24.945831,
};

const defaultZoom = 10;

const Map = ({ stations, selectedStation, showAllPins }) => {
  const searchedStationId = selectedStation ? selectedStation.ID : null;

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={defaultZoom}>
        {stations.map((station) => {
          const isSearched = station.ID === searchedStationId;
          const shouldRender = showAllPins || isSearched;
          const icon = isSearched
            ? 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            : 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';

          return (
            shouldRender && (
              <Marker
                key={station.ID}
                position={{ lat: station.y, lng: station.x }}
                icon={icon}
              />
            )
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
