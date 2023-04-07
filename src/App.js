import React, { useState, useEffect } from "react";
import "./styles/App.css";
import stationService from "./services/station";
import Station from "./components/Station";

const App = () => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  const fetchStations = async (page) => {
    try {
      const data = await stationService.getAll(page);
      setStations((prevStations) => [...prevStations, ...data]);
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  };

  useEffect(() => {
    fetchStations(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = Math.floor(stations.length / 15) + 1;
    fetchStations(nextPage);
  };

  const handleStationClick = async (id) => {
    try {
      const stationData = await stationService.getSingle(id);
      setSelectedStation(stationData);
    } catch (error) {
      console.error("Error fetching station data:", error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>City Bike App</h1>

        <h2>Show stations</h2>
        <ul>
        {
  stations.map((station) => (
    <li key={station._id} onClick={() => handleStationClick(station.ID)}>
      {station.Nimi}
    </li>
  ))}


        </ul>

        <button onClick={handleLoadMore}>Load more stations</button>
        {selectedStation && (
          <Station station={selectedStation} />
        )}
      </div>
    </div>
  );
};

export default App;

