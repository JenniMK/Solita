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
      });
  });

stationsRouter.get("/:id", async (request, response, next) => {
    try {
        const station = await Station.findById(request.params.id)
        if (station) {
            const journeyStart = await Journey.countDocuments({ startStation: request.params.id })
            const journeyEnd = await Journey.countDocuments({ endStation: request.params.id })
            response.json({
            ...station.toObject(),
            journeyStart,
            journeyEnd,
        })
        } else {
            response.status(404).end()
        }
    } catch (error) { 
        next(error)
}
})
module.exports = stationsRouter