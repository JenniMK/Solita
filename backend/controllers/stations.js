const stationsRouter = require("express").Router()

stationsRouter.get('/', (request, response) => {
    Stations.find({}).then(stations => {
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