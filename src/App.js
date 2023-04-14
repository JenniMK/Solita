import { useState } from "react";
import { useQuery } from "react-query";
import "./styles/App.css";
import Station from "./components/Station";
import StationPagination from "./components/StationPagination";
import Journey from "./components/Journey";
import JourneyPagination from "./components/JourneyPagination";
import StationSearch from "./components/StationSearch";
import stationsService from "./services/station";
import calculationsService from "./services/calculation";
import journeysService from "./services/journey";

const App = () => {
  const [currentStationPage, setCurrentStationPage] = useState(1);
  const [currentJourneyPage, setCurrentJourneyPage] = useState(1);
  const [stationSearch, setStationSearch] = useState("");
  const [filteredStations, setFilteredStations] = useState([]);

  const limit = 15;

  const stationsQuery = useQuery(
    ["stations", currentStationPage],
    () => stationsService.getPaginated(limit, currentStationPage),
    { keepPreviousData: true }
  );

  const calculationsQuery = useQuery(
    ["calculations", currentStationPage],
    () => calculationsService.getAll(limit, currentStationPage),
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
    stationsQuery.setData((currentData) => ({
      ...currentData,
      stations: [selectedStation],
    }));
  };
  

  if (stationsQuery.isLoading || calculationsQuery.isLoading || journeysQuery.isLoading)
    return "Loading...";

  const stations = stationsQuery.data?.stations || [];
  const calcs = calculationsQuery.data?.results || [];
  const journeys = journeysQuery.data?.journeys || [];
  const totalStationPages = calculationsQuery.data?.totalStationPages || 1;
  const totalJourneyPages = calculationsQuery.data?.totalJourneyPages || 1;

  
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
              key={station.id}
              station={station}
              onClick={() => handleStationClick(station)}
            />
          ))}
        <h2>Show stations</h2>
            {stations &&
              calcs &&
              stations.map((station) => (
                <Station key={station.id} station={station} calcs={calcs} />
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