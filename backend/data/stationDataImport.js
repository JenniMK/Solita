const csv = require('csvtojson')
const Station = require('../models/station')
const connectDatabase = require('../database')
const mongoose = require('mongoose')

const fileName = './bike_stations.csv'

async function importData() {
  try {
    await connectDatabase()

    let stations
    try {
      stations = await csv({
        trim: true,
      }).fromFile(fileName)
    } catch (error) {
      console.log('Error reading CSV file:', error.message)
    }

    if (!stations) {
      console.log('No stations data found in the CSV file.')
      await mongoose.connection.close()
      return
    }

    const importData = async (stationData) => {
      try {
        const station = new Station(stationData)
        await station.save()
        console.log(`Imported station: ${stationData.ID} - ${stationData.Nimi}`)
      } catch (error) {
        console.log(`Error importing station ${stationData.ID}: ${error.message}`)
      }
    }

    for (const stationData of stations) {
      await importData(stationData)
    }

    console.log('Import finished.')
    await mongoose.connection.close()
  } catch (error) {
    console.log('Error:', error.message)
  }
}

importData()