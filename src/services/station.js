import axios from "axios";

const baseUrl = "/api/stations"

const getAll = async (page = 1, limit = 20) =>{
    const request = await axios.get(baseUrl, {
        params: {
            page,
            limit,
        },
    })
    return request.data
}

const getSingle = async (id) => {
    const request = await axios.get(`${baseUrl}/${id}`);
    return request.data;
  };

export default { getAll, getSingle }