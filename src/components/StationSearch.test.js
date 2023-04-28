import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StationSearch from './StationSearch';

describe('StationSearch component', () => {
  const mockOnClick = jest.fn();

  const station = {
    ID: '1',
    Nimi: 'Test Station',
  };

  beforeEach(() => {
    render(<StationSearch station={station} onClick={mockOnClick} />);
  });

  test('renders station name', () => {
    const stationName = screen.getByText(/Test Station/i);
    expect(stationName).toBeInTheDocument();
  });

  test('handles button click', () => {
    const stationElement = screen.getByText(/Test Station/i);
    fireEvent.click(stationElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
