const stationsRouter = require('express').Router()
const Station = require('../models/station')

stationsRouter.get('/', async (request, response, next) => {
  try {
    const page = parseInt(request.query.page) || 1
    const limit = parseInt(request.query.limit) || 15
    const skip = (page - 1) * limit

    const stations = await Station.find({})
      .skip(skip)
      .limit(limit)

    const totalStations = await Station.countDocuments()
    const totalStationPages = Math.ceil(totalStations / limit)

    response.json({ stations, totalStationPages })
  } catch (error) {
    next(error)
  }
})

stationsRouter.get('/search', async (request, response, next) => {
  const query = request.query.query
  if (!query) {
    return response.status(400).json({ error: 'Missing query parameter' })
  }
  try {
    const stations = await Station.find({
      Nimi: { $regex: query, $options: 'i' },
    })
    response.json(stations)
  } catch (error) {
    next(error)
  }
})

stationsRouter.get('/:id', async (request, response, next) => {
  try {
    const station = await Station.findById(request.params.id)
    if (station) {
      response.json(station)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = stationsRouter
