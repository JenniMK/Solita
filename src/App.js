
import { useState } from "react";

const App = () => {
  const [journey, setJourney] = useState("");

  const showJourney = () => {};

  return (
    <div className="App">
      <input
          className="search-box"
          type="text"
          placeholder="Search for the station"
        />
      <div className="container">
        <h1>City Bike App</h1>
        <p>
          <button>Show all journeys</button>
        </p>
      </div>
    </div>
  );
};

export default App;
