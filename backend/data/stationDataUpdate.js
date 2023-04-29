const Station = require('../models/station')
const Journey = require('../models/journey')
const connectDatabase = require('../database')
const mongoose = require('mongoose')

async function stationDataUpdate() {
  try {
    await connectDatabase()
    
    const stations = await Station.find({})
    
    const updatePromises = stations.map(async (station) => {
      const journeyStartPromise = Journey.countDocuments({
        'Departure station id': station.ID,
      })
    
      const journeyEndPromise = Journey.countDocuments({
        'Return station id': station.ID,
      })
    
      const [journeyStart, journeyEnd] = await Promise.all([
        journeyStartPromise,
        journeyEndPromise,
      ])
    
      return Station.updateOne(
        { _id: station._id },
        {
          $set: {
            journeyStart,
            journeyEnd,
          },
        }
      )
    })
    
    await Promise.all(updatePromises)
    
  } catch (error) {
    console.error(error)
  } finally {
    await mongoose.disconnect()
    console.log('MongoDB connection closed.')
  }
}

stationDataUpdate()