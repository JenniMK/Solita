import axios from "axios"
const baseUrl = "api/journeys"

const getAll = async (page = 1, limit = 20) => {
    const request = await axios.get(baseUrl, {
        params: {
            page,
            limit
        },
    })
    return request.data
}

export default { getAll }