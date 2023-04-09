const stationsRouter = require("express").Router()
const Station = require("../models/station")
const Journey = require("../models/journey")

stationsRouter.get("/", (request, response) => {
  const limit = parseInt(request.query.limit) || 20;
  const skip = (page - 1) * limit;

  Station.find({})
    .then(stations => {
      response.json(stations);
    });
});

  stationsRouter.get("/:id", (request, response, next) => {
    Station.findById(request.params.id)
      .then(station => {
        if (station) {
          response.json(station);
        } else {
          response.status(404).end();
        }
      })
      .catch(error => next(error));
  });

module.exports = stationsRouter

