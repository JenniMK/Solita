const calcsRouter = require("express").Router();
const Station = require("../models/station");
const Journey = require("../models/journey");

calcsRouter.get("/", async (request, response, next) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 15;
    const skip = (page - 1) * limit;

    console.log('Aggregation query started:', new Date().toISOString());
    const stations = await Station.find({})
      .skip(skip)
      .limit(limit);

    const results = await Promise.all(
      stations.map(async (station) => {
        const journeyStart = await Journey.aggregate([
          { $match: { "Departure station id": { $eq: station.ID } } },
          { $group: { _id: null, journeyStart: { $sum: 1 } } },
        ]);

        const journeyEnd = await Journey.aggregate([
          { $match: { "Return station id": { $eq: station.ID } } },
          { $group: { _id: null, journeyEnd: { $sum: 1 } } },
        ]);

        return {
          ...station.toObject(),
          journeyStart: journeyStart[0]?.journeyStart ?? 0,
          journeyEnd: journeyEnd[0]?.journeyEnd ?? 0,
        };
      })
    );
    console.log('Aggregation query completed:', new Date().toISOString());
    response.json(results);
  } catch (error) {
    next(error);
  }
});

module.exports = calcsRouter;