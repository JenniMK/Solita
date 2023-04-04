const journeysRouter = require("express").Router();
const Journey = require("../models/journey");

journeysRouter.get('/', (request, response) => {
    Journey.find({}).then(journeys => {
      response.json(journeys)
    })
  })
  
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