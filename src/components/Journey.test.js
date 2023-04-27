import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Journey from "./Journey";
import JourneyPagination from "./JourneyPagination";


test("renders journey information when journey is provided", () => {
  const mockJourney = {
    id: 1,
    "Departure station name": "Station A",
    "Return station name": "Station B",
    "Covered distance (m)": 1500,
    Duration_sec: 1800,
  };

  render(<Journey journey={mockJourney} />);

  expect(screen.getByText(/From:/i)).toBeInTheDocument();
  expect(screen.getByText(/To:/i)).toBeInTheDocument();
  expect(screen.getByText(/Distance:/i)).toBeInTheDocument();
  expect(screen.getByText(/Time:/i)).toBeInTheDocument();

  expect(screen.getByText(/Station A/i)).toBeInTheDocument();
  expect(screen.getByText(/Station B/i)).toBeInTheDocument();
  expect(screen.getByText(/1.50 km/i)).toBeInTheDocument();
  expect(screen.getByText(/30.00 min/i)).toBeInTheDocument();
});

describe("JourneyPagination component", () => {
  test("renders the correct current page and total pages", () => {
    render(
      <JourneyPagination
        currentJourneyPage={2}
        totalJourneyPages={5}
        handleNextJourneyPage={() => {}}
        handlePrevJourneyPage={() => {}}
      />
    );

    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  test("previous button is disabled on the first page", () => {
    render(
      <JourneyPagination
        currentJourneyPage={1}
        totalJourneyPages={5}
        handleNextJourneyPage={() => {}}
        handlePrevJourneyPage={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
  });

  test("next button is disabled on the last page", () => {
    render(
      <JourneyPagination
        currentJourneyPage={5}
        totalJourneyPages={5}
        handleNextJourneyPage={() => {}}
        handlePrevJourneyPage={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });

  test("previous and next buttons are enabled on a middle page", () => {
    render(
      <JourneyPagination
        currentJourneyPage={3}
        totalJourneyPages={5}
        handleNextJourneyPage={() => {}}
        handlePrevJourneyPage={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /previous/i })).toBeEnabled();
    expect(screen.getByRole("button", { name: /next/i })).toBeEnabled();
  });
});
