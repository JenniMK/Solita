import { useState } from 'react';
import { useQuery } from 'react-query';
import "./styles/App.css";
import Station from './components/Station';
import Pagination from './components/Pagination';
import stationsService from './services/station';
import calculationsService from './services/calculation';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 15;

  const stationsQuery = useQuery(
    ['stations', currentPage], 
    () => stationsService.getPaginated(limit, currentPage),
    { keepPreviousData: true }
  );

  const calculationsQuery = useQuery(
    ['calculations', currentPage], 
    () => calculationsService.getAll(limit, currentPage),
    { keepPreviousData: true }
  );

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (stationsQuery.isLoading || calculationsQuery.isLoading) return "Loading...";

  return (
    <div className="App">
      <div className="container">
        <h1>City Bike App</h1>
        <h2>Show stations</h2>
        {stationsQuery.data?.stations && calculationsQuery.data?.results && stationsQuery.data.stations.map((station) => (
          <Station key={station.id} station={station} calcs={calculationsQuery.data.results} />
        ))}
        <Pagination
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={calculationsQuery.data?.totalPages}
        />
      </div>
    </div>
  );
}

export default App;
