import React from 'react'

const StationSearch = ({ station, onClick }) => {
  return (
    <div onClick={onClick}>
      <p>{station.Nimi}</p>
    </div>
  )
}

export default StationSearch
