const stationsRouter = require("express").Router()
const Station = require("../models/station")

stationsRouter.get('/', (request, response) => {
    Station.find({}).then(stations => {
      response.json(stations)
    })
  })

stationsRouter.get("/:id", (request, response, next) => {
    Station.findById(request.params.id)
    .then(station => {
        if (station) {
            response.json(station)
        } else {
            response.status(404).end()
        }
    })
    .catch(error => next(error))
})

module.exports = stationsRouter