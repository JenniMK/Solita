import { useState, useEffect } from 'react';
import "./styles/App.css";
import Station from './components/Station';
import Pagination from './components/Pagination';
import stationsService from './services/station';
import calculationsService from './services/calculation';

function App() {
  const [stations, setStations] = useState([]);
  const [calcs, setCalcs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = async (page) => {
    setLoading(true);
    const limit = 20;

    const stationsData = await stationsService.getPaginated(limit, page);
    setStations(stationsData.stations);
    console.log(stations)

    const calculationsData = await calculationsService.getAll(limit, page);
    setCalcs(calculationsData.results);
    setTotalPages(calculationsData.totalPages);

    setLoading(false);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (loading) return "Loading...";


  return (
    <div className="App">
      <div className="container">
        <h1>City Bike App</h1>
        <h2>Show stations</h2>
        {stations && calcs && stations.map((station) => (
          <Station key={station.id} station={station} calcs={calcs} />
        ))}
        <Pagination
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default App;