import axios from "axios";

const baseUrl = "http://localhost:3001/api/calculations";

const getAll = async (limit, page) => {
  const response = await axios.get(`${baseUrl}?page=${page}&limit=${limit}`);
  const results = response.data.results;
  const totalStationPages = response.data.totalStationPages;
  console.log(totalStationPages)

  return {
    results: results,
    totalStationPages: totalStationPages,
  };
};

export default { getAll };
