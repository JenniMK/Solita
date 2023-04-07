import React, { useState, useEffect } from "react";
import "./styles/App.css";
import stationService from "./services/station";
import calculationService from "./services/calculation";
import Station from "./components/Station";

const App = () => {
  const [stations, setStations] = useState([]);
  const [calcs, setCalcs] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await stationService.getAll();
        setStations(data);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    calculationService.getAll().then((calcs) => {
      console.log(calcs);
      setCalcs(calcs);
    });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>City Bike App</h1>
        <h2>Show stations</h2>
        <div>
          {stations.map((station) => (
            <Station key={station.ID} station={station} calcs={calcs} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;


