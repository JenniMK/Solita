import { useState, useEffect } from 'react';
import "./styles/App.css";
import Station from './components/Station';
import StationPagination from './components/StationPagination';
import Journey from './components/Journey';
import stationsService from './services/station';
import calculationsService from './services/calculation';
import journeysService from "./services/journey"

const App = () => {
  const [stations, setStations] = useState([]);
  const [journeys, setJourneys] = useState([0])
  const [calcs, setCalcs] = useState([]);
  const [currentStationPage, setCurrentStationPage] = useState(1);
  const [totalStationPages, setTotalStationPages] = useState(1);
  const [currentJourneyPage, setCurrentJourneyPage] = useState(1);
  const [totalJourneyPages, setTotalJourneyPages] = useState(1);

  const [loading, setLoading] = useState(true);
  
  const fetchStationsData = async (page) => {
    setLoading(true);
    const limit = 15;
  
    const stationsData = await stationsService.getPaginated(limit, page);
    setStations(stationsData.stations);
  
    const calculationsData = await calculationsService.getAll(limit, page);
    setCalcs(calculationsData.results);
    setTotalStationPages(calculationsData.totalStationPages);
    setTotalJourneyPages(calculationsData.totalJourneyPages);
  
    setLoading(false);
  };
  
  
  const fetchJourneysData = async (page) => {
    setLoading(true);
    const limit = 15;
  
    const journeysData = await journeysService.getPaginated(limit, page);
    setJourneys(journeysData.journeys);
  
    setLoading(false);
  };
  
  
  useEffect(() => {
    fetchStationsData(currentStationPage);
  }, [currentStationPage]);

  useEffect(() => {
    fetchJourneysData(currentJourneyPage);
  }, [currentJourneyPage]);


  const handleNextStationPage = () => {
    setCurrentStationPage(currentStationPage + 1);
  };

  const handlePrevStationPage = () => {
    setCurrentStationPage(currentStationPage - 1);
  };

  if (loading) return "Loading...";

  // App.js
return (
  <div className="App">
    <div className="container">
      <h1>City Bike App</h1>
      <h2>Show stations</h2>
      {stations && calcs && stations.map((station) => (
        <Station key={station.id} station={station} calcs={calcs} />
      ))}
      <StationPagination
        handlePrevStationPage={handlePrevStationPage}
        handleNextStationPage={handleNextStationPage}
        currentStationPage={currentStationPage}
        totalStationPages={totalStationPages}
      />
      <h2>Show journeys</h2>
      {journeys && journeys.map((journey) => (
        <Journey key={journey.id} journey={journey} />
      ))}
      
    </div>
  </div>
);
      }
export default App;
