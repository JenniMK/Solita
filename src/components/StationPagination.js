import React from 'react';

const StationPagination = ({ handleNextStationPage, handlePrevStationPage, currentStationPage, totalStationPages }) => {
  return (
    <div>
      <button className="prevButton" onClick={handlePrevStationPage} disabled={currentStationPage === 1}>Previous</button>
      <span>Page {currentStationPage} of {totalStationPages}</span>
      <button className="nextButton" onClick={handleNextStationPage} disabled={currentStationPage === totalStationPages}>Next</button>
    </div>
  );
};

export default StationPagination;