import axios from "axios";

const baseUrl = "http://localhost:3001/api/calculations";

const getAll = async (limit, page) => {
  const response = await axios.get(`${baseUrl}?page=${page}&limit=${limit}`);
  const results = response.data.results;
  const totalPages = response.data.totalPages;
  console.log(totalPages)

  return {
    results: results,
    totalPages: totalPages,
  };
};

export default { getAll };
