const journeysRouter = require("express").Router();
const Journey = require("../models/journey");

journeysRouter.get("/", (request, response) => {
  // Get the 'page' and 'limit' query parameters from the request
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 20;

  // Calculate the number of items to skip based on the current page and limit
  const skip = (page - 1) * limit;

  // Fetch the paginated data from the database
  Journey.find({})
    .skip(skip)
    .limit(limit)
    .then(journeys => {
      response.json(journeys);
    });
});

journeysRouter.get("/:id", (request, response, next) => {
  Journey.findById(request.params.id)
    .then(journey => {
      if (journey) {
        response.json(journey);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

module.exports = journeysRouter;