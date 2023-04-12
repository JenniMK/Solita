import React from 'react';

const StationPagination = ({ handleNextStationPage, handlePrevStationPage, currentStationPage, totalPages }) => {
  return (
    <div>
      <button className="prevButton" onClick={handlePrevStationPage} disabled={currentStationPage === 1}>Previous</button>
      <span>Page {currentStationPage} of {totalPages}</span>
      <button className="nextButton" onClick={handleNextStationPage} disabled={currentStationPage === totalPages}>Next</button>
    </div>
  );
};

export default StationPagination;