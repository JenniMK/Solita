import { useState } from "react";

const Station = ({ station, calcs }) => {
  const [visible, setVisible] = useState(false)
  if (!station) {
    return <div>Loading...</div>;
  }

  const calcData = calcs.find((calc) => calc.ID === station.ID) || {
    journeyStart: 0,
    journeyEnd: 0,
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <h3 onClick={toggleVisible}>{station.Nimi}</h3>
      {visible && (
        <div>
          <p>{station.Osoite}</p>
          <p>Total journeys starting from the station: {calcData.journeyStart}</p>
          <p>Total journeys ending at the station: {calcData.journeyEnd}</p>
        </div>
      )}
    </div>
  );
};

export default Station;