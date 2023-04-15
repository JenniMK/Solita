import { useState } from "react";
import { useQuery } from "react-query";
import "./styles/App.css";
import Station from "./components/Station";
import StationPagination from "./components/StationPagination";
import Journey from "./components/Journey";
import JourneyPagination from "./components/JourneyPagination";
import StationSearch from "./components/StationSearch";
import Map from "./components/Map";
import stationsService from "./services/station";
import journeysService from "./services/journey";

const App = () => {
  const [currentStationPage, setCurrentStationPage] = useState(1);
  const [currentJourneyPage, setCurrentJourneyPage] = useState(1);
  const [stationSearch, setStationSearch] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null)

  const limit = 15;

  const stationsQuery = useQuery(
    ["stations", currentStationPage],
    () => stationsService.getPaginated(limit, currentStationPage),
    { keepPreviousData: true }
  );

  const journeysQuery = useQuery(
    ["journeys", currentJourneyPage],
    () => journeysService.getPaginated(limit, currentJourneyPage),
    { keepPreviousData: true }
  );

  const handleNextStationPage = () => {
    setCurrentStationPage(currentStationPage + 1);
  };

  const handlePrevStationPage = () => {
    setCurrentStationPage(currentStationPage - 1);
  };

  const handleNextJourneyPage = () => {
    setCurrentJourneyPage(currentJourneyPage + 1);
  };

  const handlePrevJourneyPage = () => {
    setCurrentJourneyPage(currentJourneyPage - 1);
  };

  const handleSearch = async (event) => {
    const stationSearch = event.target.value;
    setStationSearch(stationSearch);

    if (stationSearch.length > 0) {
      const searchResults = await stationsService.searchStations(stationSearch);
      setFilteredStations(
        searchResults.filter((station) =>
          station.Nimi.toLowerCase().startsWith(stationSearch.toLowerCase())
        )
      );
    } else {
      setFilteredStations([]);
    }
  };

  const handleStationClick = (selectedStation) => {
    setSelectedStation(selectedStation);
  };
  
  if (stationsQuery.isLoading || journeysQuery.isLoading)
    return "Loading...";

    const stations = selectedStation
    ? [selectedStation]
    : stationsQuery.data?.stations?.stations || [];
  const journeys = journeysQuery.data?.journeys?.journeys || [];
  const totalStationPages = stationsQuery.data?.stations?.totalStationPages || 1;
  const totalJourneyPages = journeysQuery.data?.journeys?.totalJourneyPages || 1;

  
  return (
    <div className="App">
      <div className="container">
        <h1>City Bike App</h1>
        <input
          type="text"
          placeholder="Search for station"
          value={stationSearch}
          onChange={handleSearch}
        />
        {stationSearch &&
          filteredStations.map((station) => (
            <StationSearch
  key={station.ID}
  station={station}
  onClick={() => handleStationClick(station)}
/>
))}
          <div className="map-container">
        <Map stations={stations} selectedStation={selectedStation} />
      </div>
        <h2>Show stations</h2>
            {stations &&
              stations.map((station) => (
                <Station key={station.id} station={station} />
              ))}
            <StationPagination
              handlePrevStationPage={handlePrevStationPage}
              handleNextStationPage={handleNextStationPage}
              currentStationPage={currentStationPage}
              totalStationPages={totalStationPages}
            />
        <h2>Show journeys</h2>
        {journeys &&
          journeys.map((journey) => (
            <Journey key={journey.id} journey={journey} />
          ))}
        <JourneyPagination
          handlePrevJourneyPage={handlePrevJourneyPage}
          handleNextJourneyPage={handleNextJourneyPage}
          currentJourneyPage={currentJourneyPage}
          totalJourneyPages={totalJourneyPages}
        />
      </div>
    </div>
  );
};
export default App