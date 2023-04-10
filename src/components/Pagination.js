import React from 'react';

const Pagination = ({ handleNextPage, handlePrevPage, currentPage, totalPages }) => {
  return (
    <div>
      <button className="prevButton" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button className="nextButton" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default Pagination;