const journeysRouter = require("express").Router();
const Journey = require("../models/journey");

journeysRouter.get("/", async (request, response, next) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 15;

    const skip = (page - 1) * limit;

    const journeys = await Journey.find({})
      .skip(skip)
      .limit(limit);

    const totalJourneys = await Journey.countDocuments();
    const totalJourneyPages = Math.ceil(totalJourneys / limit);

    response.json({ journeys, totalJourneyPages });
  } catch (error) {
    next(error);
  }
});

journeysRouter.get("/:id", async (request, response, next) => {
  try {
    const journey = await Journey.findById(request.params.id);
    if (journey) {
      response.json(journey);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = journeysRouter;
