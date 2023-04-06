import React, { useState, useEffect } from 'react';
import './styles/App.css';
import stationService from './services/station';
import SingleStation from './components/Station';

const App = () => {
  const [stations, setStations] = useState([]);
  const [selectedStationId, setSelectedStationId] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await stationService.getAll();
        setStations(data);
      } catch (error) {
        console.error('Error fetching stations:', error);
      }
    };

    fetchStations();
  }, []);

  const selectedStation = selectedStationId ? stations.find(station => station.ID === selectedStationId) : null;

  return (
    <div className="App">
      <input
        className="search-box"
        type="text"
        placeholder="Search for the station"
      />
      <div className="container">
        <h1>City Bike App</h1>
        <p>
          <button>Show all journeys</button>
        </p>
        <h2>Show stations</h2>
        <ul>
          {stations.map((station) => (
            <li
              key={station.ID}
              onClick={() => setSelectedStationId(station.ID)}
            >
              {station.Nimi} {station.Osoite} 
            </li>
          ))}
        </ul>
        <SingleStation station={selectedStation} />
      </div>
    </div>
  );
};

export default App;

