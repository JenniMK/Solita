import React from 'react'

const JourneyPagination = ({ handleNextJourneyPage, handlePrevJourneyPage, currentJourneyPage, totalJourneyPages }) => {
  return (
    <div>
      <button className='prevJourButton' onClick={handlePrevJourneyPage} disabled={currentJourneyPage === 1}>Previous</button>
      <span>Page {currentJourneyPage} of {totalJourneyPages}</span>
      <button className='nextJourButton' onClick={handleNextJourneyPage} disabled={currentJourneyPage === totalJourneyPages}>Next</button>
    </div>
  )
}

export default JourneyPagination