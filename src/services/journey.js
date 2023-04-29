import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/journeys'

const getPaginated = async (limit, page) => {
  const response = await axios.get(`${baseUrl}?page=${page}&limit=${limit}`)
  const journeys = response.data

  return {
    journeys: journeys,
  }
}

export default { getPaginated }
