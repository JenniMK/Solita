import axios from "axios";

const baseUrl = "http://localhost:3001/api/calculations";

const getAll = async (limit, page) => {
  const response = await axios.get(`${baseUrl}?page=${page}&limit=${limit}`);
  const results = response.data.results;
  const totalStationPages = response.data.totalStationPages;
  const totalJourneyPages = response.data.totalJourneyPages;
  console.log(totalJourneyPages)

  return {
    results: results,
    totalStationPages: totalStationPages,
    totalJourneyPages: totalJourneyPages
  };
};

export default { getAll };
