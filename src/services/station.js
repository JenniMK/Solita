import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/stations'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const searchStations = async (query) => {
  const response = await axios.get('/api/stations/search', { params: { query } })
  return response.data
}

const getPaginated = async (limit, page) => {
  const response = await axios.get(`${baseUrl}?page=${page}&limit=${limit}`)
  const stations = response.data

  return {
    stations: stations,
  }
}


export default { getAll, getPaginated, searchStations }


