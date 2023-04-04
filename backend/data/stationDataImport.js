const csv = require('csvtojson');
const Station = require('../models/station');
const connectDatabase = require('../database');
const mongoose = require('mongoose');

const fileName = "bike_stations.csv";

async function importData() {
  try {
    await connectDatabase();

    const stationArray = await csv({
      trim: true, 
    }).fromFile(fileName);

    console.log('Parsed CSV data:', stationArray);

    const validStationArray = stationArray.map((entry) => ({
      FID: Number(entry.FID),
      ID: Number(entry.ID),
      Nimi: String(entry.Nimi),
      Namn: String(entry.Namn),
      Osoite: String(entry.Osoite),
      Adress: String(entry.Adress),
      Kaupunki: String(entry.Kaupunki),
      Stad: String(entry.Stad),
      Operaattor: String(entry.Operaattor),
      Kapasiteet: Number(entry.Kapasiteet),
      x: String(entry.x),
      y: String(entry.y),
    }));

    await Station.insertMany(validStationArray);
    console.log(`Data imported successfully from ${fileName}!`);

  } catch (error) {
    console.error('Error during import:', error.message, error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
}

importData();