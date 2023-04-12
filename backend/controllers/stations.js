const stationsRouter = require("express").Router()
const Station = require("../models/station")
const Journey = require("../models/journey")

stationsRouter.get("/", (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 15;
  const skip = (page - 1) * limit;

  Station.find({})
    .skip(skip)
    .limit(limit)
    .then(stations => {
      response.json(stations);
    })
    .catch(error => next(error));
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

