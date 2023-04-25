import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Station from "./Station";

describe("Station component", () => {
  test("renders loading message when station prop is not provided", () => {
    render(<Station />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders station name and toggles additional information on click", () => {
    const station = {
      Nimi: "Test Station",
      Osoite: "123 Test Street",
      journeyStart: 10,
      journeyEnd: 5,
    };

    render(<Station station={station} />);

    expect(screen.getByText(station.Nimi)).toBeInTheDocument();

    const stationName = screen.getByText(station.Nimi);
    fireEvent.click(stationName);

    expect(screen.getByText(station.Osoite)).toBeInTheDocument();
    expect(screen.getByText(/Total journeys starting from the station:/i)).toBeInTheDocument();
    expect(screen.getByText(/Total journeys ending at the station:/i)).toBeInTheDocument();

    fireEvent.click(stationName);

    expect(screen.queryByText(station.Osoite)).not.toBeInTheDocument();
    expect(screen.queryByText(/Total journeys starting from the station:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Total journeys ending at the station:/i)).not.toBeInTheDocument();
  });
});
