import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Station from './Station'
import StationPagination from './StationPagination'


describe('Station component', () => {
  test('renders loading message when station prop is not provided', () => {
    render(<Station />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders station name and toggles additional information on click', () => {
    const station = {
      Nimi: 'Test Station',
      Osoite: '123 Test Street',
      journeyStart: 10,
      journeyEnd: 5,
    }

    render(<Station station={station} />)

    expect(screen.getByText(station.Nimi)).toBeInTheDocument()

    const stationName = screen.getByText(station.Nimi)
    fireEvent.click(stationName)

    expect(screen.getByText(station.Osoite)).toBeInTheDocument()
    expect(screen.getByText(/Total journeys starting from the station:/i)).toBeInTheDocument()
    expect(screen.getByText(/Total journeys ending at the station:/i)).toBeInTheDocument()

    fireEvent.click(stationName)

    expect(screen.queryByText(station.Osoite)).not.toBeInTheDocument()
    expect(screen.queryByText(/Total journeys starting from the station:/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/Total journeys ending at the station:/i)).not.toBeInTheDocument()
  })
})

describe('StationPagination component', () => {
  test('renders the correct current page and total pages', () => {
    render(
      <StationPagination
        currentStationPage={2}
        totalStationPages={5}
        handleNextStationPage={() => {}}
        handlePrevStationPage={() => {}}
      />
    )

    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument()
  })

  test('previous button is disabled on the first page', () => {
    render(
      <StationPagination
        currentStationPage={1}
        totalStationPages={5}
        handleNextStationPage={() => {}}
        handlePrevStationPage={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
  })

  test('next button is disabled on the last page', () => {
    render(
      <StationPagination
        currentStationPage={5}
        totalStationPages={5}
        handleNextStationPage={() => {}}
        handlePrevStationPage={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  })

  test('previous and next buttons are enabled on a middle page', () => {
    render(
      <StationPagination
        currentStationPage={3}
        totalStationPages={5}
        handleNextStationPage={() => {}}
        handlePrevStationPage={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /previous/i })).toBeEnabled()
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled()
  })
})
